// Lightweight Remark plugin to transform GitHub-style callouts inside blockquotes
// Usage (in remark pipeline): .use(remarkCallouts)

type Node = any;

function isParagraph(node: Node) {
  return node && node.type === 'paragraph' && Array.isArray(node.children);
}

function getParagraphText(p: Node): string {
  if (!isParagraph(p)) return '';
  return p.children.map((c: Node) => (typeof c.value === 'string' ? c.value : '')).join('');
}

function stripMarkerFromParagraph(p: Node, marker: string) {
  if (!isParagraph(p)) return;
  if (!p.children.length) return;
  const first = p.children[0];
  if (first.type === 'text' && typeof first.value === 'string') {
    // Remove the marker and optional trailing punctuation/space
    first.value = first.value.replace(new RegExp(`^\\s*\\[!${marker}\\]\\s*:?\\s*`, 'i'), '');
  }
}

export default function remarkCallouts() {
  return function transformer(tree: Node) {
    function visit(node: Node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          // Process blockquotes
          if (
            child &&
            child.type === 'blockquote' &&
            Array.isArray(child.children) &&
            child.children.length
          ) {
            // First, split a single blockquote into multiple when multiple callout markers appear
            const groups: Node[][] = [];
            let current: Node[] | null = null;
            for (const grandChild of child.children) {
              const isMarkerPara =
                isParagraph(grandChild) &&
                /^\s*\[!(NOTE|INFO|QUOTE)\]/i.test(getParagraphText(grandChild));
              if (isMarkerPara) {
                if (current && current.length) groups.push(current);
                current = [grandChild];
              } else {
                if (!current) current = [];
                current.push(grandChild);
              }
            }
            if (current && current.length) groups.push(current);

            if (groups.length > 1) {
              // Replace original blockquote with multiple blockquotes, each styled according to its first paragraph marker
              const newBlocks: Node[] = groups.map((children: Node[]) => {
                const bq: Node = { type: 'blockquote', children };
                const firstPara: Node | undefined = children.find(isParagraph);
                if (firstPara) {
                  const text = getParagraphText(firstPara).trim();
                  const m = text.match(/^\[!(NOTE|INFO|QUOTE)\]/i);
                  if (m) {
                    const kind = m[1].toUpperCase();
                    if (/^\[!(NOTE|INFO|QUOTE)\]\s*:?\s*$/i.test(text)) {
                      // drop marker-only paragraph
                      const idx = children.indexOf(firstPara);
                      if (idx !== -1) children.splice(idx, 1);
                    } else {
                      stripMarkerFromParagraph(firstPara, kind);
                    }
                    bq.data = bq.data || {};
                    const h = (bq.data.hProperties = bq.data.hProperties || {});
                    const classes = new Set<string>();
                    classes.add('callout');
                    if (kind === 'NOTE') classes.add('note');
                    else if (kind === 'INFO') classes.add('info');
                    else if (kind === 'QUOTE') classes.add('quote');
                    const classList = Array.from(classes);
                    h.className = classList;
                    h.class = classList.join(' ');
                    h['data-callout'] = kind.toLowerCase();
                  }
                }
                return bq;
              });
              // Replace the single node with many
              node.children.splice(i, 1, ...newBlocks);
              // Move index to account for inserted nodes
              i += newBlocks.length - 1;
            } else {
              // Single blockquote: apply callout styling if it starts with a marker
              const first = child.children[0];
              if (isParagraph(first)) {
                const text = getParagraphText(first).trim();
                const match = text.match(/^\[!(NOTE|INFO|QUOTE)\]/i);
                if (match) {
                  const kind = match[1].toUpperCase();
                  if (/^\[!(NOTE|INFO|QUOTE)\]\s*:?\s*$/i.test(text)) {
                    child.children.shift();
                  } else {
                    stripMarkerFromParagraph(first, kind);
                  }
                  child.data = child.data || {};
                  const h = (child.data.hProperties = child.data.hProperties || {});
                  const classes = new Set<string>(
                    Array.isArray(h.className)
                      ? (h.className as string[])
                      : typeof h.className === 'string'
                        ? (h.className as string).split(/\s+/)
                        : [],
                  );
                  classes.add('callout');
                  if (kind === 'NOTE') classes.add('note');
                  else if (kind === 'INFO') classes.add('info');
                  else if (kind === 'QUOTE') classes.add('quote');
                  const classList = Array.from(classes);
                  h.className = classList;
                  h.class = classList.join(' ');
                  h['data-callout'] = kind.toLowerCase();
                }
              }
            }
          }
          // Recurse
          visit(child);
        }
      }
    }
    visit(tree);
  };
}
