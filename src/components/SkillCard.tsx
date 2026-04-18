import { ChevronRight, Flame, Wrench } from 'lucide-react';
import type { Skill } from '@/types';

export const SkillCard = ({ skill, onOpen }: { skill: Skill; onOpen: () => void }) => (
  <button onClick={onOpen} className="tap pressable surface w-full rounded-[1.6rem] p-4 text-left transition hover:border-accent/40">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-base font-semibold tracking-[-0.02em] text-text">{skill.name}</div>
        <div className="mt-1 text-[13px] leading-6 text-muted">{skill.description}</div>
      </div>
      <ChevronRight size={18} className="mt-1 shrink-0 text-muted" />
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted">
      <div className="surface-soft rounded-[1rem] p-3">
        <div className="flex items-center gap-2 text-text"><Wrench size={14} /> Effort XP</div>
        <div className="mt-1 text-lg font-semibold tracking-[-0.02em] text-text">{skill.effortXp}</div>
      </div>
      <div className="surface-soft rounded-[1rem] p-3">
        <div className="flex items-center gap-2 text-text"><Flame size={14} /> Streak</div>
        <div className="mt-1 text-lg font-semibold tracking-[-0.02em] text-text">{skill.streak}d</div>
      </div>
    </div>
    <div className="mt-4 space-y-3">
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted"><span>Progress</span><span>{skill.progress}%</span></div>
        <div className="progress-track"><div className="h-full rounded-full bg-gradient-to-r from-accent to-[#95a9ff]" style={{ width: `${skill.progress}%` }} /></div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted"><span>Achievement</span><span>{skill.achievementProgress}%</span></div>
        <div className="progress-track"><div className="h-full rounded-full bg-gradient-to-r from-accent2 to-[#72cfff]" style={{ width: `${skill.achievementProgress}%` }} /></div>
      </div>
    </div>
  </button>
);
