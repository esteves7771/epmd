import type { Attribute } from '@/types';

export const AttributeCard = ({ attribute }: { attribute: Attribute }) => (
  <div className="surface rounded-[1.5rem] p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[15px] font-semibold tracking-[-0.02em] text-text">{attribute.name}</div>
        <div className="mt-1 line-clamp-2 text-[12px] leading-5 text-muted">{attribute.description}</div>
      </div>
      <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${attribute.trend >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
        {attribute.trend >= 0 ? '+' : ''}
        {attribute.trend}
      </div>
    </div>
    <div className="progress-track mt-4">
      <div className="progress-fill" style={{ width: `${attribute.score}%` }} />
    </div>
    <div className="mt-2 flex items-center justify-between text-xs">
      <span className="text-muted">Current state</span>
      <span className="font-semibold text-text">{attribute.score}/100</span>
    </div>
  </div>
);
