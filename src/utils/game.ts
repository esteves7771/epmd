import type { Attribute, DailyLog, Habit, Quest, ScoreEntry, Task } from '@/types';
import { diffDays, toDateKey } from './date';

const intensityWeight: Record<DailyLog['intensity'], number> = {
  light: 6,
  medium: 10,
  strong: 15,
};

const categoryBias: Record<DailyLog['category'], number> = {
  'deep work': 12,
  training: 12,
  learning: 10,
  social: 8,
  rest: 6,
  leisure: 3,
  'waste / distraction': -14,
  'negative behavior': -18,
  habit: 7,
  'quest progress': 12,
};

export const calculateDailyScore = ({
  big3,
  habits,
  logs,
  currentPhase,
}: {
  big3: Task[];
  habits: Habit[];
  logs: DailyLog[];
  currentPhase: string;
}) => {
  const big3Score = big3.filter((t) => t.completed).length * 16;
  const habitScore = habits.reduce((sum, habit) => {
    return sum + (habit.completedDates.includes(toDateKey()) ? habit.scoreWeight : 0);
  }, 0);
  const logScore = logs.reduce((sum, log) => {
    const base = intensityWeight[log.intensity] + categoryBias[log.category] + log.quality * 1.2;
    return sum + base;
  }, 0);
  const alignmentBonus = logs.some((log) => log.title.toLowerCase().includes(currentPhase.toLowerCase().split(' ')[0])) ? 8 : 0;
  return Math.max(0, Math.min(100, Math.round(big3Score + habitScore + logScore / 4 + alignmentBonus)));
};

export const calculateXP = ({
  score,
  logs,
  reviewsDone,
  big3,
}: {
  score: number;
  logs: DailyLog[];
  reviewsDone: number;
  big3: Task[];
}) => {
  const logXp = logs.reduce((sum, log) => sum + intensityWeight[log.intensity] + Math.max(0, log.quality - 5), 0);
  const questXp = big3.filter((task) => task.completed).length * 25;
  return Math.max(10, Math.round(score * 1.1 + logXp + reviewsDone * 16 + questXp));
};

export const calculateLevel = (xp: number) => {
  let level = 1;
  let remaining = xp;
  let threshold = 120;
  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = Math.round(threshold * 1.18);
  }
  return {
    level,
    progress: Math.max(0, Math.min(100, Math.round((remaining / threshold) * 100))),
    nextLevelXp: threshold,
    currentLevelXp: remaining,
  };
};

export const calculateStreak = (days: string[]) => {
  const unique = [...new Set(days)].sort().reverse();
  if (unique.length === 0) return 0;
  let streak = unique[0] === toDateKey() ? 1 : 0;
  for (let i = 1; i < unique.length; i += 1) {
    if (diffDays(unique[i - 1], unique[i]) === 1) streak += 1;
    else break;
  }
  return streak;
};

export const getNextBestAction = ({ attributes, big3, habits }: { attributes: Attribute[]; big3: Task[]; habits: Habit[] }) => {
  const incompleteBig3 = big3.find((task) => !task.completed);
  if (incompleteBig3) {
    return `Push your next core block: ${incompleteBig3.title}`;
  }
  const missingHabit = habits.find((habit) => !habit.completedDates.includes(toDateKey()));
  if (missingHabit) {
    return `Keep momentum alive with ${missingHabit.name}`;
  }
  const weakest = [...attributes].sort((a, b) => a.score - b.score)[0];
  return `Reinforce ${weakest.name.toLowerCase()} with one focused action block.`;
};

export const buildScoreHistory = (scores: ScoreEntry[], range: 1 | 7 | 15) => {
  return scores.slice(-range).map((entry) => ({
    ...entry,
    day: entry.date.slice(5),
  }));
};
