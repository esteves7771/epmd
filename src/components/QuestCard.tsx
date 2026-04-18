import type { Quest } from '@/types';

export const QuestCard = ({ quest, onToggle }: { quest: Quest; onToggle?: () => void }) => (
  <div className="surface rounded-[1.5rem] p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[15px] font-semibold tracking-[-0.01em] text-text">{quest.title}</div>
        <div className="mt-1 text-[13px] leading-6 text-muted">{quest.description}</div>
        {quest.dueLabel && <div className="mt-2 text-xs font-medium text-accent2">{quest.dueLabel}</div>}
      </div>
      {onToggle && (
        <button onClick={onToggle} className={`rounded-full px-3 py-2 text-xs font-semibold ${quest.completed ? 'bg-success/10 text-success' : 'bg-white/5 text-text'}`}>
          {quest.completed ? 'Complete' : 'Open'}
        </button>
      )}
    </div>
  </div>
);
