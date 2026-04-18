export const DailyScoreRing = ({ score }: { score: number }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (score / 100) * circumference;
  const status = score >= 80 ? 'Strong day' : score >= 60 ? 'On track' : score >= 40 ? 'Needs correction' : 'Drifting';

  return (
    <div className="hero-card flex min-h-[184px] items-center justify-center rounded-[1.75rem] p-4">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 128 128" className="metric-ring-shadow h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="url(#grad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dash}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#68e4ff" />
              <stop offset="100%" stopColor="#7c9cff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">Daily score</span>
          <span className="mt-1 text-[2.15rem] font-semibold leading-none tracking-[-0.05em] text-text">{score}</span>
          <span className="mt-2 rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] text-muted">{status}</span>
        </div>
      </div>
    </div>
  );
};
