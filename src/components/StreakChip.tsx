export const StreakChip = ({ label, value }: { label: string; value: number }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.05] px-3.5 py-2.5 text-xs text-text">
    <span className="h-2 w-2 rounded-full bg-accent2 shadow-[0_0_10px_rgba(104,228,255,0.45)]" />
    <span>{label}</span>
    <strong className="text-accent2">{value}d</strong>
  </div>
);
