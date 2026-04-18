import type { ReactNode } from 'react';

export const StatCard = ({ label, value, hint, icon }: { label: string; value: string | number; hint?: string; icon?: ReactNode }) => (
  <div className="surface card-tight">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{label}</div>
        <div className="mt-2 text-[1.7rem] font-semibold leading-none tracking-[-0.04em] text-text">{value}</div>
        {hint && <div className="mt-2 text-[12px] leading-5 text-muted">{hint}</div>}
      </div>
      {icon && <div className="surface-soft rounded-[1rem] p-3 text-accent2">{icon}</div>}
    </div>
  </div>
);
