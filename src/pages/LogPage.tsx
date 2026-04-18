import type { ReactNode } from 'react';
import { useState } from 'react';
import { CheckCircle2, Clock3, Layers3, Sparkles, TimerReset, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import type { Intensity, LogCategory } from '@/types';

const categories: LogCategory[] = ['deep work', 'training', 'learning', 'social', 'rest', 'leisure', 'waste / distraction', 'negative behavior', 'habit', 'quest progress'];
const intensities: Intensity[] = ['light', 'medium', 'strong'];

export const LogPage = () => {
  const addLog = useAppStore((s) => s.addLog);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const [title, setTitle] = useState('Focused build block');
  const [category, setCategory] = useState<LogCategory>('deep work');
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const [quality, setQuality] = useState(7);
  const [duration, setDuration] = useState(30);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const submit = () => {
    addLog({ title, category, intensity, quality, duration, note });
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  return (
    <AppShell title="Quick log" subtitle="Fast input. Real behavior data.">
      <div className="space-y-5">
        <div className="hero-card rounded-[1.75rem] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent2">
                <Sparkles size={12} /> Logging flow
              </div>
              <div className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-[-0.04em] text-text">Capture the action before the moment disappears.</div>
              <div className="mt-2 text-[13px] leading-6 text-muted">Choose a preset, adjust the essentials, save, and get back to execution.</div>
            </div>
            <div className="rounded-[1rem] bg-white/5 p-3 text-accent2"><Zap size={18} /></div>
          </div>
        </div>

        <div className="surface rounded-[1.75rem] p-4">
          <div className="flex items-center justify-between gap-3">
            <SectionHeader title="Fast presets" subtitle="One tap defaults for repeated actions" />
            <div className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] text-muted">Speed mode</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <QuickPreset icon={<Layers3 size={15} />} title="Deep work 45" subtitle="Strong focus block" onClick={() => { setTitle('Deep work block'); setCategory('deep work'); setIntensity('strong'); setDuration(45); setQuality(8); setNote(''); }} />
            <QuickPreset icon={<Zap size={15} />} title="Training 60" subtitle="High output session" onClick={() => { setTitle('Training session'); setCategory('training'); setIntensity('strong'); setDuration(60); setQuality(8); setNote(''); }} />
            <QuickPreset icon={<Clock3 size={15} />} title="Read 20" subtitle="Skill reinforcement" onClick={() => { setTitle('Reading session'); setCategory('learning'); setIntensity('light'); setDuration(20); setQuality(7); setNote(''); }} />
            <QuickPreset icon={<TimerReset size={15} />} title="Drift" subtitle="Recover the block" onClick={() => { setTitle('Unplanned drift'); setCategory('waste / distraction'); setIntensity('medium'); setDuration(25); setQuality(3); setNote(''); }} />
          </div>
        </div>

        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="Log action" subtitle="This should take seconds" />
          <div className="mt-4 space-y-4">
            <Field label="What did you do">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-shell" />
            </Field>
            <Field label="Category">
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <Tag key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Tag>
                ))}
              </div>
            </Field>
            <Field label="Intensity">
              <div className="grid grid-cols-3 gap-2">
                {intensities.map((item) => (
                  <Tag key={item} active={intensity === item} onClick={() => setIntensity(item)}>{item}</Tag>
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <SliderCard label="Quality" value={`${quality}/10`}>
                <input type="range" min={1} max={10} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-accent2" />
              </SliderCard>
              <SliderCard label="Duration" value={`${duration} min`}>
                <input type="range" min={5} max={180} step={5} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-accent" />
              </SliderCard>
            </div>

            <Field label="Optional note">
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="input-shell min-h-[96px] resize-none" />
            </Field>
          </div>
        </div>

        <div className="sticky bottom-[5.7rem] z-20 space-y-3">
          <motion.button whileTap={{ scale: 0.988 }} onClick={submit} className={`primary-button flex w-full items-center gap-2 rounded-[1.5rem] ${saved ? 'bg-success shadow-none' : ''}`}>
            <CheckCircle2 size={18} /> {saved ? 'Logged. System updated.' : 'Save log'}
          </motion.button>
          <button onClick={() => setActiveTab('home')} className="secondary-button flex w-full rounded-[1.5rem]">
            Back to dashboard
          </button>
        </div>
      </div>
    </AppShell>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <div className="mb-2 text-[13px] font-medium text-muted">{label}</div>
    {children}
  </label>
);

const Tag = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button onClick={onClick} className={`rounded-[1rem] border px-3 py-3 text-sm transition ${active ? 'border-accent/10 bg-accent text-white shadow-glow' : 'border-line bg-white/5 text-muted'}`}>{children}</button>
);

const QuickPreset = ({ title, subtitle, onClick, icon }: { title: string; subtitle: string; onClick: () => void; icon: ReactNode }) => (
  <button onClick={onClick} className="tap pressable surface-soft rounded-[1.15rem] p-3 text-left">
    <div className="flex items-center gap-2 text-accent2">{icon}<span className="text-[13px] font-semibold text-text">{title}</span></div>
    <div className="mt-1 text-[12px] leading-5 text-muted">{subtitle}</div>
  </button>
);

const SliderCard = ({ label, value, children }: { label: string; value: string; children: ReactNode }) => (
  <div className="surface-soft rounded-[1.15rem] p-3.5">
    <div className="mb-2 flex items-center justify-between text-[12px] text-muted">
      <span>{label}</span>
      <span className="font-semibold text-text">{value}</span>
    </div>
    {children}
  </div>
);
