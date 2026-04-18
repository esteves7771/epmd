import { useMemo } from 'react';
import { Activity, BarChart3, Flame, Sparkles, Swords, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/AppShell';
import { AttributeCard } from '@/components/AttributeCard';
import { Big3List } from '@/components/Big3List';
import { ChartCard } from '@/components/ChartCard';
import { DailyScoreRing } from '@/components/DailyScoreRing';
import { HabitTile } from '@/components/HabitTile';
import { NextBestActionCard } from '@/components/NextBestActionCard';
import { RecentActivityFeed } from '@/components/RecentActivityFeed';
import { SectionHeader } from '@/components/SectionHeader';
import { StatCard } from '@/components/StatCard';
import { StreakChip } from '@/components/StreakChip';
import { XPBar } from '@/components/XPBar';
import { useAppStore } from '@/store/useAppStore';
import { buildScoreHistory, calculateLevel, getNextBestAction } from '@/utils/game';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export const HomePage = () => {
  const profile = useAppStore((s) => s.profile);
  const attributes = useAppStore((s) => s.attributes);
  const habits = useAppStore((s) => s.habits);
  const logs = useAppStore((s) => s.logs);
  const scores = useAppStore((s) => s.scores);
  const big3 = useAppStore((s) => s.big3);
  const messages = useAppStore((s) => s.messages);
  const mainQuest = useAppStore((s) => s.mainQuest);
  const skills = useAppStore((s) => s.skills);
  const usageStreak = useAppStore((s) => s.usageStreak);
  const alignedDayStreak = useAppStore((s) => s.alignedDayStreak);
  const toggleHabit = useAppStore((s) => s.toggleHabit);
  const toggleBig3 = useAppStore((s) => s.toggleBig3);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const xp = useAppStore((s) => s.xp);

  const levelMeta = useMemo(() => calculateLevel(xp), [xp]);
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayScore = scores.length ? scores[scores.length - 1].score : 0;
  const nextAction = getNextBestAction({ attributes, big3, habits });
  const scoreChart = buildScoreHistory(scores, 7);
  const habitsDone = habits.filter((habit) => habit.completedDates.includes(todayKey)).length;
  const big3Done = big3.filter((task) => task.completed).length;
  const topSkills = skills.slice(0, 3);
  const alignmentTone = todayScore >= 75 ? 'Aligned' : todayScore >= 55 ? 'Stable' : 'Needs correction';

  return (
    <AppShell title={`Welcome back, ${profile.identity.characterName}`} subtitle={profile.currentState.lifePhase}>
      <div className="space-y-5">
        <section className="hero-card overflow-hidden rounded-[1.9rem] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent2">
                <Sparkles size={12} /> Character state
              </div>
              <div className="mt-3 text-[1.6rem] font-semibold leading-tight tracking-[-0.04em] text-text">
                Stay aligned with the build you said you want.
              </div>
              <p className="mt-2 text-[13px] leading-6 text-muted">
                Your strongest leverage today is clarity, momentum, and protecting the next meaningful block.
              </p>
            </div>
            <div className="hidden rounded-[1.25rem] border border-white/10 bg-white/5 p-3 text-accent2 sm:block">
              <Activity size={18} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1.05fr_1fr] gap-3">
            <DailyScoreRing score={todayScore} />
            <div className="space-y-3">
              <StatCard label="Rank" value={profile.rank} icon={<Target size={18} />} hint="Current character class" />
              <StatCard label="Phase" value={alignmentTone} icon={<Zap size={18} />} hint={profile.currentPhase} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <MiniStat label="Big 3" value={`${big3Done}/3`} />
            <MiniStat label="Habits" value={`${habitsDone}/${habits.length}`} />
            <MiniStat label="Logs" value={Math.min(logs.length, 99)} />
          </div>
        </section>

        <XPBar progress={levelMeta.progress} level={levelMeta.level} />

        <div className="flex flex-wrap gap-2">
          <StreakChip label="Usage" value={usageStreak} />
          <StreakChip label="Aligned days" value={alignedDayStreak} />
          <StreakChip label="Best habit" value={Math.max(...habits.map((h) => h.streak))} />
        </div>

        <NextBestActionCard title={nextAction} onPress={() => setActiveTab('log')} />

        <section className="surface rounded-[1.75rem] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Main quest</div>
              <div className="mt-2 text-lg font-semibold tracking-[-0.02em] text-text">{profile.currentPhase}</div>
              <p className="mt-2 text-[13px] leading-6 text-muted">{mainQuest.description}</p>
            </div>
            <div className="rounded-[1rem] bg-white/5 p-3 text-accent2"><Swords size={18} /></div>
          </div>
        </section>

        <SectionHeader title="Big 3" subtitle="The three actions that matter most today" action={<button onClick={() => setActiveTab('quests')} className="text-sm text-accent2">Manage</button>} />
        <Big3List tasks={big3} onToggle={toggleBig3} />

        <SectionHeader title="Habits" subtitle="Fast daily reinforcement" action={<button onClick={() => setActiveTab('quests')} className="text-sm text-accent2">Open</button>} />
        <div className="space-y-3">
          {habits.slice(0, 3).map((habit) => (
            <HabitTile key={habit.id} habit={habit} done={habit.completedDates.includes(todayKey)} onToggle={() => toggleHabit(habit.id)} />
          ))}
        </div>

        <SectionHeader title="Skill momentum" subtitle="Active build areas this week" action={<button onClick={() => setActiveTab('skills')} className="text-sm text-accent2">View</button>} />
        <div className="grid grid-cols-1 gap-3">
          {topSkills.map((skill) => (
            <motion.button
              whileTap={{ scale: 0.987 }}
              key={skill.id}
              onClick={() => setActiveTab('skills')}
              className="surface flex items-center justify-between gap-3 rounded-[1.5rem] p-4 text-left"
            >
              <div className="min-w-0">
                <div className="text-[15px] font-semibold tracking-[-0.02em] text-text">{skill.name}</div>
                <div className="mt-1 text-[12px] text-muted">{skill.rank} · {skill.streak}d streak</div>
              </div>
              <div className="min-w-[92px]">
                <div className="mb-1 flex items-center justify-between text-[11px] text-muted"><span>Progress</span><span>{skill.progress}%</span></div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${skill.progress}%` }} /></div>
              </div>
            </motion.button>
          ))}
        </div>

        <SectionHeader title="Attributes" subtitle="Your current operating state" />
        <div className="grid grid-cols-2 gap-3">
          {attributes.map((attribute) => (
            <AttributeCard key={attribute.id} attribute={attribute} />
          ))}
        </div>

        <SectionHeader title="Score trend" subtitle="Seven day command line" />
        <ChartCard title="7 day score trend" action={<div className="text-xs text-muted">Last 7 days</div>}>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreChart}>
                <defs>
                  <linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#68e4ff" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#68e4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#94a3c4" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#101725', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                <Area type="monotone" dataKey="score" stroke="#68e4ff" fill="url(#scoreArea)" strokeWidth={2.25} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <SectionHeader title="Recent system messages" subtitle="Serious feedback, not noise" />
        <div className="space-y-3">
          {messages.slice(0, 3).map((message) => (
            <div key={message.id} className="surface rounded-[1.5rem] p-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent2"><Flame size={14} /> {message.tone}</div>
              <p className="mt-2 text-[14px] leading-6 text-text">{message.message}</p>
            </div>
          ))}
        </div>

        <SectionHeader title="Recent logs" subtitle="What you actually did" action={<button onClick={() => setActiveTab('log')} className="text-sm text-accent2">Log action</button>} />
        <RecentActivityFeed logs={logs} />

        <div className="sticky bottom-[5.7rem] z-20">
          <motion.button whileTap={{ scale: 0.988 }} onClick={() => setActiveTab('log')} className="primary-button flex w-full items-center gap-2 rounded-[1.5rem]">
            <BarChart3 size={18} /> Log Action
          </motion.button>
        </div>
      </div>
    </AppShell>
  );
};

const MiniStat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="surface-soft rounded-[1.15rem] p-3">
    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</div>
    <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-text">{value}</div>
  </div>
);
