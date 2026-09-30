'use client';

import CoverLetterDocument from '@/components/cv/CoverLetterDocument';
import CvDocument from '@/components/cv/CvDocument';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import type { Product } from '@/lib/products';
import type { ApplicationLanguage, PersonalizedCv } from '@/lib/applications/types';

type Props = {
  profile: PersonalizedCv;
  company: string;
  coverLetter: string | null;
  writtenAt: string;
  projects: Product[];
  language: ApplicationLanguage;
  canonicalPath?: string;
  /** Base path for the PDF routes; `${pdfBasePath}/cv` and `${pdfBasePath}/cover-letter`. */
  pdfBasePath?: string;
  compact?: boolean;
};

const documentPanelClass =
  'col-start-1 row-start-1 min-w-0 outline-none ' +
  'transition-[opacity,filter,translate] [transition-duration:300ms,130ms,300ms] delay-75 ease-[cubic-bezier(0.2,0,0,1)] ' +
  'data-starting-style:opacity-0 data-starting-style:blur-[6px] ' +
  'data-ending-style:opacity-0 data-ending-style:blur-[5px] data-ending-style:[transition-duration:200ms,90ms,200ms] data-ending-style:delay-0 ' +
  'motion-safe:data-starting-style:data-[activation-direction=right]:translate-x-8 ' +
  'motion-safe:data-ending-style:data-[activation-direction=right]:-translate-x-7 ' +
  'motion-safe:data-starting-style:data-[activation-direction=left]:-translate-x-8 ' +
  'motion-safe:data-ending-style:data-[activation-direction=left]:translate-x-7 ' +
  'motion-reduce:transition-none';

export default function ApplicationDocuments({
  profile,
  company,
  coverLetter,
  writtenAt,
  projects,
  language,
  canonicalPath,
  pdfBasePath,
  compact = false,
}: Props) {
  const cvLabel = language === 'de' ? 'Lebenslauf' : 'CV';
  const coverLetterLabel = language === 'de' ? 'Anschreiben' : 'Cover Letter';

  return (
    <Tabs defaultValue="cover-letter" lang={language}>
      <div className={`${compact ? 'pt-4' : 'pt-8'} flex justify-center print:hidden`}>
        <TabsList aria-label={language === 'de' ? 'Bewerbungsunterlagen' : 'Application documents'}>
          <TabsTrigger value="cover-letter">{coverLetterLabel}</TabsTrigger>
          <TabsTrigger value="cv">{cvLabel}</TabsTrigger>
        </TabsList>
      </div>
      <div className="relative grid grid-cols-1 overflow-x-clip">
        <TabsContent value="cover-letter" className={documentPanelClass}>
          <CoverLetterDocument
            company={company}
            coverLetter={coverLetter}
            language={language}
            writtenAt={writtenAt}
            pdfHref={pdfBasePath && `${pdfBasePath}/cover-letter`}
            compact={compact}
          />
        </TabsContent>
        <TabsContent value="cv" className={documentPanelClass}>
          <CvDocument
            profile={profile}
            company={company}
            projects={projects}
            canonicalPath={canonicalPath}
            pdfHref={pdfBasePath && `${pdfBasePath}/cv`}
            compact={compact}
            language={language}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
