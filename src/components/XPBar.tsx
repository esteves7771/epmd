export const XPBar = ({ progress, level }: { progress: number; level: number }) => (
  <div className="surface rounded-[1.75rem] p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Level progress</div>
        <div className="mt-1 text-xl font-semibold tracking-[-0.03em] text-text">Level {level}</div>
      </div>
      <div className="rounded-full border border-accent2/20 bg-accent2/10 px-3 py-1.5 text-xs font-semibold text-accent2">{progress}%</div>
    </div>
    <div className="progress-track mt-4 h-3">
      <div className="h-full rounded-full bg-gradient-to-r from-accent2 via-[#73d7ff] to-accent shadow-[0_0_20px_rgba(104,228,255,0.25)]" style={{ width: `${progress}%` }} />
    </div>
  </div>
);
