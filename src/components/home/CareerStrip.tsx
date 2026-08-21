/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import CompanyCard from './CompanyCard';
import { cv } from '@/lib/cv';
import { companyKeyByOrg } from '@/lib/companies';

/**
 * Quiet credibility under the hero. The company marks are icon-only, so each
 * one carries its name; the full history lives on /cv.
 */
export default function CareerStrip() {
  const roles = cv.roles.filter((role) => role.logo);

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:flex-nowrap lg:justify-between lg:gap-x-4">
      {roles.map((role) => {
        const key = companyKeyByOrg[role.org];
        const label = (
          <span className="flex items-center gap-2.5 whitespace-nowrap">
            <img
              src={role.logo}
              alt=""
              className="h-6 w-6 object-contain opacity-70 dark:invert-60"
            />
            <span className="text-[14px] font-medium text-ink-muted">{role.org}</span>
          </span>
        );
        return key ? (
          <CompanyCard key={role.org} id={key}>
            {label}
          </CompanyCard>
        ) : (
          <span key={role.org}>{label}</span>
        );
      })}
      <Link
        href="/cv"
        className="whitespace-nowrap text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
      >
        Full CV →
      </Link>
    </div>
  );
}
