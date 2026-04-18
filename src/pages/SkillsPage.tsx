import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { EmptyState } from '@/components/EmptyState';
import { SectionHeader } from '@/components/SectionHeader';
import { SkillCard } from '@/components/SkillCard';
import { useAppStore } from '@/store/useAppStore';
import { formatShortDate } from '@/utils/date';

export const SkillsPage = () => {
  const skills = useAppStore((s) => s.skills);
  const selectedSkillId = useAppStore((s) => s.selectedSkillId);
  const setSelectedSkillId = useAppStore((s) => s.setSelectedSkillId);
  const skill = skills.find((item) => item.id === selectedSkillId) ?? null;

  return (
    <AppShell title="Skills" subtitle="Real life development tracks">
      <SectionHeader title="Skill build" subtitle="Effort creates capacity. Achievement proves results." />
      <div className="space-y-3">
        {skills.length === 0 ? <EmptyState title="No skills yet" description="Use onboarding or settings to define your build." /> : null}
        {skills.map((skillItem) => (
          <SkillCard key={skillItem.id} skill={skillItem} onOpen={() => setSelectedSkillId(skillItem.id)} />
        ))}
      </div>

      <AnimatePresence>
        {skill && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 24 }} className="absolute bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 rounded-t-[2rem] border border-line bg-panel p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-accent2">{skill.rank}</div>
                  <div className="text-xl font-semibold text-text">{skill.name}</div>
                </div>
                <button onClick={() => setSelectedSkillId(null)} className="rounded-2xl bg-white/5 p-3 text-muted"><X size={18} /></button>
              </div>
              <p className="text-sm text-muted">{skill.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric label="Effort" value={`${skill.effortXp} XP`} progress={skill.progress} />
                <Metric label="Achievement" value={`${skill.achievementProgress}%`} progress={skill.achievementProgress} accent="bg-accent2" />
              </div>
              <div className="mt-5 rounded-3xl bg-white/5 p-4">
                <div className="text-sm font-semibold text-text">Milestones</div>
                <div className="mt-3 space-y-2">
                  {skill.milestones.map((milestone) => (
                    <div key={milestone.id} className="rounded-2xl bg-black/10 p-3 text-sm text-muted">
                      <span className={milestone.completed ? 'text-success' : 'text-text'}>{milestone.completed ? 'Completed' : 'Pending'}</span>
                      <div className="mt-1">{milestone.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-white/5 p-4">
                <div className="text-sm font-semibold text-text">Recent activity</div>
                <div className="mt-2 text-sm text-muted">Last active {formatShortDate(skill.lastActivityDate)} · {skill.streak} day streak · status {skill.rustStatus}</div>
                <div className="mt-3 space-y-2">
                  {skill.notes.map((note) => (
                    <div key={note} className="rounded-2xl bg-black/10 p-3 text-sm text-muted">{note}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
};

const Metric = ({ label, value, progress, accent = 'bg-accent' }: { label: string; value: string; progress: number; accent?: string }) => (
  <div className="rounded-3xl bg-white/5 p-4">
    <div className="text-xs uppercase tracking-[0.14em] text-muted">{label}</div>
    <div className="mt-1 text-lg font-semibold text-text">{value}</div>
    <div className="mt-3 h-2 rounded-full bg-white/6">
      <div className={`h-full rounded-full ${accent}`} style={{ width: `${progress}%` }} />
    </div>
  </div>
);
