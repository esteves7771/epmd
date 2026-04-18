import type { CheckIn } from '@/types';

export const ReflectionCard = ({ item }: { item: CheckIn }) => (
  <div className="surface rounded-[1.5rem] p-4">
    <div className="inline-flex rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-accent2">Alignment {item.alignment}%</div>
    <div className="mt-3 space-y-3 text-[13px] text-muted">
      <p><strong className="text-text">What went well:</strong> {item.wentWell}</p>
      <p><strong className="text-text">What drifted:</strong> {item.drifted}</p>
      <p><strong className="text-text">Fix next:</strong> {item.fixNext}</p>
    </div>
  </div>
);
