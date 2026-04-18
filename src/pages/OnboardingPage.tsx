import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import type { OnboardingDraft } from '@/types';

const starterSkills = ['AI / Automation', 'Business', 'Fitness / Climbing', 'Reading', 'Music / Piano', 'Content / Projects'];
const starterHabits = ['Morning plan', '30 min deep work', 'Train or mobility', 'Read 15 min', 'Night reset'];

const initialDraft: OnboardingDraft = {
  characterName: 'Operator',
  idealIdentity: 'A disciplined person with clear direction and consistent execution.',
  coreValues: 'Respect, Discipline, Clarity',
  longTermGoals: 'Build leverage, stay healthy, reduce drift',
  strengthenBehaviors: 'Deep work, training, shipping',
  reduceBehaviors: 'Scrolling, delay, reactive behavior',
  focus: 60,
  discipline: 58,
  health: 65,
  social: 52,
  energy: 63,
  lifePhase: 'Rebuild and focus',
  skills: starterSkills.slice(0, 4),
  habits: starterHabits.slice(0, 4),
};

export const OnboardingPage = () => {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(initialDraft);

  const overview = useMemo(
    () => [
      { label: 'Identity', value: draft.idealIdentity },
      { label: 'Phase', value: draft.lifePhase },
      { label: 'Skills', value: draft.skills.join(', ') },
      { label: 'Habits', value: draft.habits.join(', ') },
    ],
    [draft],
  );

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-hero-gradient px-4 py-6 text-text">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-accent2">EPMD</div>
          <h1 className="mt-3 text-3xl font-semibold text-gradient">Build your life like a serious character system</h1>
          <p className="mt-3 text-sm text-muted">Your life is the game. You are the character. This app is your operating system.</p>
        </div>

        <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/6">
          <div className="h-full rounded-full bg-gradient-to-r from-accent2 to-accent" style={{ width: `${(step / 6) * 100}%` }} />
        </div>

        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="surface rounded-3xl p-5">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">Welcome</h2>
              <p className="mt-3 text-sm text-muted">EPMD helps you manage real life as a build system, not as a toy. The question stays simple: what you are doing now brings you closer to or further from the person you want to become?</p>
              <div className="mt-5 space-y-3 text-sm text-muted">
                <div className="rounded-2xl bg-white/5 p-3">See your current state clearly.</div>
                <div className="rounded-2xl bg-white/5 p-3">Track alignment across skills, habits, and quests.</div>
                <div className="rounded-2xl bg-white/5 p-3">Get fast logging and a next best action when momentum drops.</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ideal identity</h2>
              <Input label="Character name" value={draft.characterName} onChange={(value) => setDraft({ ...draft, characterName: value })} />
              <TextArea label="Who do you want to become" value={draft.idealIdentity} onChange={(value) => setDraft({ ...draft, idealIdentity: value })} />
              <Input label="Core values" hint="Comma separated" value={draft.coreValues} onChange={(value) => setDraft({ ...draft, coreValues: value })} />
              <Input label="Long term goals" hint="Comma separated" value={draft.longTermGoals} onChange={(value) => setDraft({ ...draft, longTermGoals: value })} />
              <Input label="Behaviors to strengthen" hint="Comma separated" value={draft.strengthenBehaviors} onChange={(value) => setDraft({ ...draft, strengthenBehaviors: value })} />
              <Input label="Behaviors to reduce" hint="Comma separated" value={draft.reduceBehaviors} onChange={(value) => setDraft({ ...draft, reduceBehaviors: value })} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">Current state</h2>
              <Slider label="Focus" value={draft.focus} onChange={(value) => setDraft({ ...draft, focus: value })} />
              <Slider label="Discipline" value={draft.discipline} onChange={(value) => setDraft({ ...draft, discipline: value })} />
              <Slider label="Health" value={draft.health} onChange={(value) => setDraft({ ...draft, health: value })} />
              <Slider label="Social" value={draft.social} onChange={(value) => setDraft({ ...draft, social: value })} />
              <Slider label="Energy" value={draft.energy} onChange={(value) => setDraft({ ...draft, energy: value })} />
              <Input label="Current main life phase" value={draft.lifePhase} onChange={(value) => setDraft({ ...draft, lifePhase: value })} />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold">Core skills</h2>
              <p className="mt-2 text-sm text-muted">Choose the development tracks that define your current build.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {starterSkills.map((skill) => {
                  const active = draft.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          skills: active ? prev.skills.filter((item) => item !== skill) : [...prev.skills, skill].slice(0, 6),
                        }))
                      }
                      className={`rounded-full px-4 py-2 text-sm ${active ? 'bg-accent text-white' : 'bg-white/5 text-muted'}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-semibold">Initial habits</h2>
              <p className="mt-2 text-sm text-muted">Pick 3 to 5 low friction habits. These should be realistic enough to survive bad days.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {starterHabits.map((habit) => {
                  const active = draft.habits.includes(habit);
                  return (
                    <button
                      key={habit}
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          habits: active ? prev.habits.filter((item) => item !== habit) : [...prev.habits, habit].slice(0, 5),
                        }))
                      }
                      className={`rounded-full px-4 py-2 text-sm ${active ? 'bg-accent2 text-bg' : 'bg-white/5 text-muted'}`}
                    >
                      {habit}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-xl font-semibold">Character overview</h2>
              <p className="mt-2 text-sm text-muted">This is your starting profile. The app will help you measure if your daily behavior supports this direction.</p>
              <div className="mt-4 space-y-3">
                {overview.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/5 p-3">
                    <div className="text-xs uppercase tracking-[0.16em] text-muted">{item.label}</div>
                    <div className="mt-1 text-sm text-text">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={back} className="surface rounded-2xl px-4 py-3 text-sm text-muted">Back</button>
          {step < 6 ? (
            <button onClick={next} className="rounded-2xl bg-accent px-4 py-3 text-sm font-medium text-white">Continue</button>
          ) : (
            <button onClick={() => completeOnboarding(draft)} className="rounded-2xl bg-accent2 px-4 py-3 text-sm font-medium text-bg">Enter system</button>
          )}
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) => (
  <label className="block">
    <div className="mb-2 text-sm text-muted">{label}{hint ? <span className="ml-1 text-xs">· {hint}</span> : null}</div>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-text outline-none placeholder:text-muted" />
  </label>
);

const TextArea = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <label className="block">
    <div className="mb-2 text-sm text-muted">{label}</div>
    <textarea value={value} rows={4} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-text outline-none placeholder:text-muted" />
  </label>
);

const Slider = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <label className="block">
    <div className="mb-2 flex items-center justify-between text-sm text-muted"><span>{label}</span><span>{value}</span></div>
    <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-accent2" />
  </label>
);
