import type { ReactNode } from 'react';

export const ChartCard = ({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) => (
  <div className="surface rounded-[1.75rem] p-4">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="text-[15px] font-semibold tracking-[-0.02em] text-text">{title}</div>
      {action}
    </div>
    {children}
  </div>
);
