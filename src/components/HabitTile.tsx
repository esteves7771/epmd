import { Check } from 'lucide-react';
import type { Habit } from '@/types';

export const HabitTile = ({ habit, done, onToggle }: { habit: Habit; done: boolean; onToggle: () => void }) => (
  <button onClick={onToggle} className={`tap pressable surface flex w-full items-center gap-3 rounded-[1.5rem] p-4 text-left ${done ? 'border-success/30 bg-[linear-gradient(180deg,rgba(18,34,28,0.95),rgba(12,18,30,0.95))]' : ''}`}>
    <div className={`flex h-12 w-12 items-center justify-center rounded-[1rem] border ${done ? 'border-success/30 bg-success/10 text-success' : 'border-line bg-white/5 text-muted'}`}>
      <Check size={18} />
    </div>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[15px] font-medium tracking-[-0.01em] text-text">{habit.name}</div>
      <div className="mt-1 text-[12px] text-muted">{habit.category} · {habit.mode} · {habit.streak}d streak</div>
    </div>
    <div className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold ${done ? 'bg-success/10 text-success' : 'bg-white/5 text-muted'}`}>{done ? 'Done' : 'Tap'}</div>
  </button>
);
