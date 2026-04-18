import { CheckCircle2 } from 'lucide-react';
import type { Task } from '@/types';

export const Big3List = ({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) => (
  <div className="space-y-3">
    {tasks.map((task, index) => (
      <button key={task.id} onClick={() => onToggle(task.id)} className={`tap pressable surface flex w-full items-center gap-3 rounded-[1.5rem] p-4 text-left ${task.completed ? 'border-success/30 bg-[linear-gradient(180deg,rgba(18,34,28,0.95),rgba(12,18,30,0.95))]' : ''}`}>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border ${task.completed ? 'border-success/20 bg-success/10 text-success' : 'border-white/8 bg-white/5 text-accent2'}`}>
          {task.completed ? <CheckCircle2 size={18} /> : <span className="text-sm font-semibold">{index + 1}</span>}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`truncate text-[15px] font-medium ${task.completed ? 'text-muted line-through' : 'text-text'}`}>{task.title}</div>
          <div className="mt-1 text-[12px] text-muted">{task.energy} energy · {task.priority}</div>
        </div>
      </button>
    ))}
  </div>
);
