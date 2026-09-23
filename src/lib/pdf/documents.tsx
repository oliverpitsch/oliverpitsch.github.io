import { Document, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { cv } from '@/lib/cv';
import { cvDe } from '@/lib/cv-de';
import { formatLetterDate, splitLetter } from '@/lib/applications/letter';
import type { Product } from '@/lib/products';
import type { ApplicationLanguage, PersonalizedCv } from '@/lib/applications/types';

/* Light-scheme tokens from globals.css. react-pdf has no CSS variables. */
const c = {
  ink: '#1e293b',
  inkStrong: '#172033',
  inkMuted: '#5d6d84',
  /* Darker secondary text for the tinted rail cards. */
  railMuted: '#475569',
  body: '#334155',
  line: '#e2e8f0',
  accent: '#4f46e5',
  accentStrong: '#4338ca',
  accentSoft: '#eef0ff',
  rail: '#eef2f8',
  stripes: ['#4338ca', '#6366f1', '#a5b4fc'],
};

/* Ligatures extract as "workfows" in ATS parsers and copy-paste; keep glyphs 1:1 with text. */
const noLigatures = { fontFeatureSettings: { liga: false } };

export type PdfAssets = { portrait: Buffer; signature: Buffer };

const linkedinLabel = 'linkedin.com/in/oliverpitsch';

const cvLabels = {
  de: {
    experience: 'Berufserfahrung',
    about: 'Über mich',
    projects: 'Ausgewählte Projekte',
    strengths: 'Schwerpunkte',
    languages: 'Sprachen',
    contact: 'Kontakt',
    present: 'heute',
  },
  en: {
    experience: 'Work Experience',
    about: 'About me',
    projects: 'Selected work',
    strengths: 'What I do',
    languages: 'Languages',
    contact: 'Get in touch',
    present: 'present',
  },
} as const;

function Stripes({ vertical = false }: { vertical?: boolean }) {
  return (
    <View
      fixed
      style={
        vertical
          ? { position: 'absolute', top: 0, bottom: 0, right: 0, width: 6, flexDirection: 'row' }
          : { flexDirection: 'row', height: 4 }
      }
    >
      {c.stripes.map((color) => (
        <View key={color} style={{ flex: 1, backgroundColor: color }} />
      ))}
    </View>
  );
}

function Portrait({ src, size }: { src: Buffer; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: c.accentSoft,
        overflow: 'hidden',
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
      <Image src={src} style={{ width: size, height: size }} />
    </View>
  );
}

function ContactRow({
  items,
  size,
  gap,
}: {
  items: { label: string; href?: string }[];
  size: number;
  gap: number;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: gap, rowGap: 2 }}>
      {items.map((item) =>
        item.href ? (
          <Link
            key={item.label}
            src={item.href}
            style={{ fontSize: size, color: c.inkMuted, textDecoration: 'none' }}
          >
            {item.label}
          </Link>
        ) : (
          <Text key={item.label} style={{ fontSize: size, color: c.inkMuted }}>
            {item.label}
          </Text>
        ),
      )}
    </View>
  );
}

export type CvPdfProps = {
  profile: PersonalizedCv;
  projects?: Product[];
  language?: ApplicationLanguage;
  assets: PdfAssets;
  /** Uniform type and spacing scale, lowered until the document fits on one page. */
  scale?: number;
};

export function CvPdf({ profile, projects = [], language = 'en', assets, scale = 1 }: CvPdfProps) {
  const copy = cvLabels[language];
  const contact = language === 'de' ? cvDe : cv;
  const s = (value: number) => value * scale;

  const styles = StyleSheet.create({
    page: { ...noLigatures, fontFamily: 'Geist', color: c.ink, flexDirection: 'row' },
    main: { flex: 1, paddingTop: 34, paddingBottom: 28, paddingLeft: 34, paddingRight: 22 },
    rail: {
      width: 206,
      backgroundColor: c.rail,
      paddingTop: 34,
      paddingBottom: 28,
      paddingLeft: 16,
      paddingRight: 22,
    },
    name: { fontSize: s(25), fontWeight: 600, letterSpacing: -0.6, color: c.inkStrong },
    headline: { fontSize: s(11), fontWeight: 500, color: c.accent, marginTop: s(3) },
    sectionTitle: { fontSize: s(12.5), fontWeight: 600, color: c.inkStrong },
    role: { flexDirection: 'row', marginTop: s(11) },
    years: { width: 44, paddingRight: 9, fontSize: s(7.5), color: c.inkMuted, textAlign: 'right' },
    timeline: { flex: 1, paddingLeft: 11, borderLeftWidth: 1, borderLeftColor: c.line },
    dot: {
      position: 'absolute',
      left: -3.5,
      top: s(2.5),
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: c.accent,
    },
    org: { fontSize: s(9.5), fontWeight: 600, color: c.inkStrong },
    title: { fontSize: s(7.8), fontWeight: 500, color: c.accent, marginTop: s(1.5) },
    bullet: { flexDirection: 'row', marginTop: s(2.6) },
    bulletDot: {
      width: 2.6,
      height: 2.6,
      borderRadius: 1.3,
      backgroundColor: c.stripes[2],
      marginTop: s(4.2),
      marginRight: 6,
    },
    bulletText: { flex: 1, fontSize: s(8), lineHeight: 1.45, color: c.body },
    card: { backgroundColor: '#ffffff', borderRadius: 10, padding: s(11), marginBottom: s(10) },
    cardTitle: { fontSize: s(9.5), fontWeight: 600, color: c.inkStrong, marginBottom: s(5) },
    railText: { fontSize: s(7.4), lineHeight: 1.5, color: c.railMuted },
  });

  return (
    <Document
      title={`CV – ${cv.name}`}
      author={cv.name}
      subject={profile.headline}
      language={language}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Portrait src={assets.portrait} size={s(62)} />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.name}>{cv.name}</Text>
              <Text style={styles.headline}>{profile.headline}</Text>
              <View style={{ marginTop: s(6) }}>
                <ContactRow
                  size={s(8)}
                  gap={12}
                  items={[
                    { label: cv.phone, href: `tel:${cv.phone.replace(/\s/g, '')}` },
                    { label: cv.email, href: `mailto:${cv.email}` },
                    { label: contact.location },
                  ]}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: s(18),
              paddingTop: s(14),
              borderTopWidth: 1,
              borderTopColor: c.line,
            }}
          >
            <View style={{ width: 16, height: 3, backgroundColor: c.accent, marginRight: 8 }} />
            <Text style={styles.sectionTitle}>{copy.experience}</Text>
          </View>

          {profile.roles.map((role) => (
            <View key={`${role.org}-${role.from}`} style={styles.role} wrap={false}>
              <View style={styles.years}>
                <Text>{role.from}</Text>
                {role.to !== role.from && (
                  <Text>{`– ${role.to === 'present' ? copy.present : role.to}`}</Text>
                )}
              </View>
              <View style={styles.timeline}>
                <View style={styles.dot} />
                <Text style={styles.org}>
                  {role.org}
                  {role.orgNote && (
                    <Text style={{ fontWeight: 400, color: c.inkMuted }}> ({role.orgNote})</Text>
                  )}
                </Text>
                <Text style={styles.title}>{role.title}</Text>
                <View style={{ marginTop: s(2) }}>
                  {role.bullets.map((bullet) => (
                    <View key={bullet} style={styles.bullet}>
                      <View style={styles.bulletDot} />
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.rail}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{copy.about}</Text>
            {profile.about.map((paragraph, index) => (
              <Text
                key={paragraph.slice(0, 24)}
                style={[
                  styles.railText,
                  index > 0 ? { marginTop: s(5) } : {},
                  index === 0 ? { fontWeight: 600, color: c.ink } : {},
                ]}
              >
                {paragraph}
              </Text>
            ))}
          </View>

          {projects.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{copy.projects}</Text>
              {projects.map((project, index) => (
                <View key={project.name} style={index > 0 ? { marginTop: s(5) } : {}}>
                  <Link
                    src={project.href}
                    style={{
                      fontSize: s(8),
                      fontWeight: 600,
                      color: c.ink,
                      textDecoration: 'none',
                    }}
                  >
                    {project.name}
                  </Link>
                  <Text style={styles.railText}>{project.lead}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{copy.strengths}</Text>
            {profile.strengths.map((strength, index) => (
              <Text
                key={strength.label}
                style={[styles.railText, index > 0 ? { marginTop: s(5) } : {}]}
              >
                <Text style={{ fontWeight: 600, color: c.ink }}>{strength.label}. </Text>
                {strength.detail}
              </Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{copy.languages}</Text>
            <Text style={styles.railText}>{contact.languages.join(' · ')}</Text>
          </View>

          <View style={{ marginTop: 'auto', alignItems: 'center' }}>
            <Text style={[styles.cardTitle, { marginBottom: s(4) }]}>{copy.contact}</Text>
            <Link
              src={`mailto:${cv.email}`}
              style={{ fontSize: s(8), color: c.accent, textDecoration: 'none' }}
            >
              {cv.email}
            </Link>
            <Link
              src={cv.linkedin}
              style={{ fontSize: s(8), color: c.accent, textDecoration: 'none', marginTop: s(2) }}
            >
              {linkedinLabel}
            </Link>
          </View>
        </View>
        <Stripes vertical />
      </Page>
    </Document>
  );
}

export type CoverLetterPdfProps = {
  company: string;
  coverLetter: string | null;
  writtenAt: string;
  language: ApplicationLanguage;
  headline: string;
  assets: PdfAssets;
  scale?: number;
};

export function CoverLetterPdf({
  company,
  coverLetter,
  writtenAt,
  language,
  headline,
  assets,
  scale = 1,
}: CoverLetterPdfProps) {
  const contact = language === 'de' ? cvDe : cv;
  const location = language === 'de' ? 'Köln' : 'Cologne';
  const { subject, paragraphs } = splitLetter(coverLetter);
  const s = (value: number) => value * scale;
  const bodyText = { fontSize: s(10), lineHeight: 1.6, color: c.body };

  return (
    <Document
      title={`${language === 'de' ? 'Anschreiben' : 'Cover Letter'} – ${cv.name}`}
      author={cv.name}
      subject={company}
      language={language}
    >
      <Page
        size="A4"
        style={{
          ...noLigatures,
          fontFamily: 'Geist',
          color: c.ink,
          paddingTop: 48,
          paddingBottom: 40,
          paddingHorizontal: 56,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Portrait src={assets.portrait} size={s(56)} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text
              style={{ fontSize: s(22), fontWeight: 600, letterSpacing: -0.5, color: c.inkStrong }}
            >
              {cv.name}
            </Text>
            <Text style={{ fontSize: s(10), fontWeight: 500, color: c.accent, marginTop: s(3) }}>
              {headline}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {[
              { label: contact.location },
              { label: cv.phone, href: `tel:${cv.phone.replace(/\s/g, '')}` },
              { label: cv.email, href: `mailto:${cv.email}` },
              { label: linkedinLabel, href: cv.linkedin },
            ].map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  src={item.href}
                  style={{
                    fontSize: s(8),
                    lineHeight: 1.6,
                    color: c.inkMuted,
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <Text
                  key={item.label}
                  style={{ fontSize: s(8), lineHeight: 1.6, color: c.inkMuted }}
                >
                  {item.label}
                </Text>
              ),
            )}
          </View>
        </View>

        <View style={{ marginTop: s(18) }}>
          <Stripes />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: s(26),
            fontSize: s(9),
          }}
        >
          <Text style={{ fontWeight: 600, color: c.ink }}>{company}</Text>
          <Text style={{ color: c.inkMuted }}>
            {location}, {formatLetterDate(writtenAt, language)}
          </Text>
        </View>

        {subject && (
          <Text
            style={{ fontSize: s(11.5), fontWeight: 600, color: c.inkStrong, marginTop: s(26) }}
          >
            {subject}
          </Text>
        )}

        <View style={{ marginTop: s(subject ? 18 : 26) }}>
          {paragraphs.map((paragraph, index) => (
            <Text
              key={`${index}-${paragraph.slice(0, 32)}`}
              style={[bodyText, index > 0 ? { marginTop: s(9) } : {}]}
            >
              {paragraph}
            </Text>
          ))}
        </View>

        <View wrap={false} style={{ marginTop: s(4) }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
          <Image src={assets.signature} style={{ width: s(78), marginLeft: -6 }} />
          <Text style={{ fontSize: s(10), fontWeight: 600, color: c.ink, marginTop: s(-8) }}>
            {cv.name}
          </Text>
        </View>
        <Stripes vertical />
      </Page>
    </Document>
  );
}
