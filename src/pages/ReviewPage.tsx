import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ChartCard } from '@/components/ChartCard';
import { ReflectionCard } from '@/components/ReflectionCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import { buildScoreHistory } from '@/utils/game';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const ReviewPage = () => {
  const addCheckIn = useAppStore((s) => s.addCheckIn);
  const scores = useAppStore((s) => s.scores);
  const checkIns = useAppStore((s) => s.checkIns);
  const logs = useAppStore((s) => s.logs);
  const scoreRange = useAppStore((s) => s.scoreRange);
  const setScoreRange = useAppStore((s) => s.setScoreRange);
  const [alignment, setAlignment] = useState(74);
  const [wentWell, setWentWell] = useState('You protected the important block.');
  const [drifted, setDrifted] = useState('The finish became reactive.');
  const [fixNext, setFixNext] = useState('Set a clean close and protect tomorrow morning.');

  const scoreHistory = buildScoreHistory(scores, scoreRange);
  const categoryData = useMemo(() => {
    const grouped = new Map<string, number>();
    logs.slice(0, 20).forEach((log) => grouped.set(log.category, (grouped.get(log.category) ?? 0) + 1));
    return [...grouped.entries()].map(([name, value]) => ({ name, value }));
  }, [logs]);

  return (
    <AppShell title="Review" subtitle="Reflect without self deception">
      <div className="space-y-5">
        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="End of day reflection" subtitle="Serious and useful, not sentimental" />
          <div className="mt-4 space-y-4">
            <Field label={`Did your behavior match your direction today? ${alignment}%`}>
              <input type="range" min={0} max={100} value={alignment} onChange={(e) => setAlignment(Number(e.target.value))} className="w-full accent-accent2" />
            </Field>
            <Field label="What helped you move forward">
              <textarea rows={3} value={wentWell} onChange={(e) => setWentWell(e.target.value)} className="input-shell min-h-[96px] resize-none" />
            </Field>
            <Field label="What pulled you away">
              <textarea rows={3} value={drifted} onChange={(e) => setDrifted(e.target.value)} className="input-shell min-h-[96px] resize-none" />
            </Field>
            <Field label="What should be corrected next">
              <textarea rows={3} value={fixNext} onChange={(e) => setFixNext(e.target.value)} className="input-shell min-h-[96px] resize-none" />
            </Field>
            <button onClick={() => addCheckIn({ alignment, wentWell, drifted, fixNext })} className="primary-button w-full">Save reflection</button>
          </div>
        </div>

        <ChartCard title="Score trend" action={<RangeSwitch value={scoreRange} onChange={setScoreRange} />}>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreHistory}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#94a3c4" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3c4" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#101725', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                <Bar dataKey="score" fill="#7c9cff" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Logged action distribution">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={82} innerRadius={48} paddingAngle={3} fill="#68e4ff" />
                <Tooltip contentStyle={{ background: '#101725', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <SectionHeader title="Recent reflections" subtitle="Patterns matter more than mood" />
        <div className="space-y-3">
          {checkIns.map((item) => (
            <ReflectionCard key={item.id} item={item} />
          ))}
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

const RangeSwitch = ({ value, onChange }: { value: 1 | 7 | 15; onChange: (value: 1 | 7 | 15) => void }) => (
  <div className="segmented text-xs">
    {[1, 7, 15].map((range) => (
      <button key={range} onClick={() => onChange(range as 1 | 7 | 15)} className={`segmented-item ${value === range ? 'segmented-item-active' : ''}`}>
        {range}d
      </button>
    ))}
  </div>
);
