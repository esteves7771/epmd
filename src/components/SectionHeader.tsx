import type { ReactNode } from 'react';

export const SectionHeader = ({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) => (
  <div className="flex items-end justify-between gap-3">
    <div className="min-w-0">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted">{title}</h2>
      {subtitle && <p className="mt-1.5 text-[13px] leading-5 text-muted">{subtitle}</p>}
    </div>
    {action}
  </div>
);
