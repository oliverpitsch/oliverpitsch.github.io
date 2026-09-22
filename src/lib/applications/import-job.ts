import 'server-only';

import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import * as cheerio from 'cheerio';

const MAX_REDIRECTS = 4;
const MAX_BYTES = 1_500_000;

export class JobImportError extends Error {}

function isPrivateIpv4(address: string) {
  const parts = address.split('.').map(Number);
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) return isPrivateIpv4(address);
  const normalized = address.toLowerCase();
  if (normalized.startsWith('::ffff:')) return isPrivateIpv4(normalized.slice(7));
  return (
    normalized === '::' ||
    normalized === '::1' ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    /^fe[89ab]/.test(normalized)
  );
}

async function assertPublicUrl(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new JobImportError('Use an http or https job URL.');
  }
  if (url.username || url.password)
    throw new JobImportError('Job URLs cannot contain credentials.');
  if (url.port && !['80', '443'].includes(url.port)) {
    throw new JobImportError('The job URL uses an unsupported port.');
  }

  const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    throw new JobImportError('Local job URLs cannot be imported.');
  }

  const addresses = isIP(hostname)
    ? [{ address: hostname }]
    : await lookup(hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new JobImportError('The job URL does not resolve to a public website.');
  }
}

async function readLimitedText(response: Response) {
  const contentLength = Number(response.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BYTES) throw new JobImportError('The job page is too large to import.');
  if (!response.body) return '';

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      throw new JobImportError('The job page is too large to import.');
    }
    result += decoder.decode(value, { stream: true });
  }
  return result + decoder.decode();
}

async function fetchPage(initialUrl: URL) {
  let currentUrl = initialUrl;
  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    await assertPublicUrl(currentUrl);
    const response = await fetch(currentUrl, {
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(12_000),
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; pitsch.me job application importer)',
      },
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) throw new JobImportError('The job page returned an invalid redirect.');
      currentUrl = new URL(location, currentUrl);
      continue;
    }
    if (!response.ok) throw new JobImportError(`The job page returned ${response.status}.`);

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
      throw new JobImportError('The job URL does not point to an HTML page.');
    }
    return { html: await readLimitedText(response), url: currentUrl };
  }
  throw new JobImportError('The job page redirected too many times.');
}

function findJobPosting(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findJobPosting(item);
      if (match) return match;
    }
    return null;
  }
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const type = record['@type'];
  if (type === 'JobPosting' || (Array.isArray(type) && type.includes('JobPosting'))) return record;
  return findJobPosting(record['@graph']);
}

function normalizeText(value: string) {
  const lines = value
    .replace(/\u00a0/g, ' ')
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return lines
    .filter((line, index) => line !== lines[index - 1])
    .join('\n\n')
    .slice(0, 60_000);
}

function textFromHtml(fragment: string) {
  const $ = cheerio.load(fragment);
  $('br').replaceWith('\n');
  $('p,li,h1,h2,h3,h4,h5,h6').each((_, element) => {
    $(element).append('\n');
  });
  return normalizeText($.text());
}

function extractDescription(html: string) {
  const $ = cheerio.load(html);
  let title = $('title').first().text().trim();

  for (const element of $('script[type="application/ld+json"]').toArray()) {
    try {
      const posting = findJobPosting(JSON.parse($(element).html() ?? ''));
      if (posting) {
        if (typeof posting.title === 'string') title = posting.title;
        if (typeof posting.description === 'string') {
          const description = textFromHtml(posting.description);
          if (description.length > 100) return { title, description };
        }
      }
    } catch {
      // Invalid third-party JSON-LD is ignored in favor of visible page content.
    }
  }

  $('script,style,noscript,svg,nav,footer,header,form,aside').remove();
  const root = $('[itemtype*="JobPosting"]').first().length
    ? $('[itemtype*="JobPosting"]').first()
    : $('main').first().length
      ? $('main').first()
      : $('article').first().length
        ? $('article').first()
        : $('body');
  root.find('br').replaceWith('\n');
  root.find('p,li,h1,h2,h3,h4,h5,h6').each((_, element) => {
    $(element).append('\n');
  });
  return { title, description: normalizeText(root.text()) };
}

export async function importJobDescription(rawUrl: string) {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new JobImportError('Enter a valid job URL.');
  }

  const page = await fetchPage(url);
  const result = extractDescription(page.html);
  if (result.description.length < 100) {
    throw new JobImportError('No readable job description was found on that page.');
  }
  return { ...result, hostname: page.url.hostname };
}
