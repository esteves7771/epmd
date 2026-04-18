import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSeedData } from '@/data/seed';
import type { AppStateData, AppTab, CheckIn, DailyLog, Habit, OnboardingDraft, Quest, Skill, Task } from '@/types';
import { STORAGE_KEY } from '@/utils/storage';
import { calculateDailyScore, calculateLevel, calculateStreak, calculateXP } from '@/utils/game';
import { toDateKey } from '@/utils/date';

interface AppStore extends AppStateData {
  activeTab: AppTab;
  scoreRange: 1 | 7 | 15;
  selectedSkillId: string | null;
  startFresh: () => void;
  completeOnboarding: (draft: OnboardingDraft) => void;
  setActiveTab: (tab: AppTab) => void;
  setScoreRange: (range: 1 | 7 | 15) => void;
  toggleHabit: (habitId: string) => void;
  toggleBig3: (taskId: string) => void;
  toggleQuest: (questId: string, type: 'side' | 'quick') => void;
  addLog: (payload: Omit<DailyLog, 'id' | 'date'>) => void;
  addCheckIn: (payload: Omit<CheckIn, 'id' | 'date'>) => void;
  addQuest: (type: 'side' | 'quick', title: string, description: string) => void;
  updateMainQuest: (title: string, description: string) => void;
  addBig3Task: (title: string) => void;
  setSelectedSkillId: (skillId: string | null) => void;
}

const applyHabitImpact = (habit: Habit, delta: 1 | -1, data: AppStateData): AppStateData['attributes'] => {
  return data.attributes.map((attribute) => {
    const impact = habit.impact[attribute.name] ?? 0;
    if (!impact) return attribute;
    return {
      ...attribute,
      score: Math.max(0, Math.min(100, attribute.score + impact * delta)),
      trend: attribute.trend + impact * delta,
    };
  });
};

const applyLogImpact = (log: DailyLog, data: AppStateData): AppStateData['attributes'] => {
  const shifts: Partial<Record<string, number>> = {};
  if (log.category === 'training') {
    shifts.Strength = 2;
    shifts.Health = 2;
  }
  if (log.category === 'deep work') {
    shifts.Focus = 2;
    shifts.Discipline = 2;
  }
  if (log.category === 'social') shifts.Social = 2;
  if (log.category === 'waste / distraction') shifts.Discipline = -3;
  if (log.category === 'negative behavior') {
    shifts.Discipline = -4;
    shifts.Health = -2;
  }
  if (log.category === 'rest') shifts.Health = 1;
  if (log.category === 'learning') shifts.Focus = 1;

  return data.attributes.map((attribute) => {
    const shift = shifts[attribute.name] ?? 0;
    return {
      ...attribute,
      score: Math.max(0, Math.min(100, attribute.score + shift)),
      trend: attribute.trend + shift,
    };
  });
};

const recalcMeta = (state: AppStateData): Pick<AppStore, 'scores' | 'xp' | 'usageStreak' | 'alignedDayStreak'> => {
  const today = toDateKey();
  const todayLogs = state.logs.filter((log) => log.date === today);
  const todayScore = calculateDailyScore({
    big3: state.big3,
    habits: state.habits,
    logs: todayLogs,
    currentPhase: state.profile.currentPhase,
  });
  const todayXp = calculateXP({
    score: todayScore,
    logs: todayLogs,
    reviewsDone: state.checkIns.filter((checkIn) => checkIn.date === today).length,
    big3: state.big3,
  });

  const existing = state.scores.filter((entry) => entry.date !== today);
  const scores = [...existing, { date: today, score: todayScore, xp: todayXp }].sort((a, b) => a.date.localeCompare(b.date));

  const usageDates = [...state.logs.map((log) => log.date), ...state.checkIns.map((checkIn) => checkIn.date), ...state.habits.flatMap((habit) => habit.completedDates)];
  const alignedDates = state.scores.filter((entry) => entry.score >= 70).map((entry) => entry.date);

  return {
    scores,
    xp: Math.max(0, state.xp - (state.scores.find((s) => s.date === today)?.xp ?? 0) + todayXp),
    usageStreak: calculateStreak(usageDates),
    alignedDayStreak: calculateStreak(alignedDates),
  };
};

const buildProfileFromDraft = (draft: OnboardingDraft) => ({
  id: 'user-1',
  completedOnboarding: true,
  currentPhase: draft.lifePhase,
  notificationTone: 'firm' as const,
  rank: 'Strategist',
  identity: {
    characterName: draft.characterName,
    idealIdentity: draft.idealIdentity,
    coreValues: draft.coreValues.split(',').map((x) => x.trim()).filter(Boolean),
    longTermGoals: draft.longTermGoals.split(',').map((x) => x.trim()).filter(Boolean),
    strengthenBehaviors: draft.strengthenBehaviors.split(',').map((x) => x.trim()).filter(Boolean),
    reduceBehaviors: draft.reduceBehaviors.split(',').map((x) => x.trim()).filter(Boolean),
  },
  currentState: {
    focus: draft.focus,
    discipline: draft.discipline,
    health: draft.health,
    social: draft.social,
    energy: draft.energy,
    lifePhase: draft.lifePhase,
  },
});

const buildSkillsFromDraft = (draft: OnboardingDraft, existing: Skill[]) => {
  return draft.skills.map((name, index) => {
    const found = existing.find((skill) => skill.name === name);
    if (found) return found;
    return {
      id: `skill-${index + 1}`,
      name,
      description: 'User defined growth track.',
      rank: 'Initiate',
      progress: 15,
      effortXp: 40,
      achievementProgress: 8,
      streak: 0,
      lastActivityDate: toDateKey(),
      rustStatus: 'warming' as const,
      milestones: [],
      relatedTaskIds: [],
      notes: [],
    };
  });
};

const seed = createSeedData();

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...seed,
      activeTab: 'home',
      scoreRange: 7,
      selectedSkillId: null,
      startFresh: () => set({ ...createSeedData(), activeTab: 'home', scoreRange: 7, selectedSkillId: null }),
      completeOnboarding: (draft) =>
        set((state) => {
          const habits = draft.habits.map((name, index) => ({
            id: `habit-new-${index}`,
            name,
            category: 'custom',
            frequency: 'daily' as const,
            mode: 'normal' as const,
            streak: 0,
            completedDates: [],
            impact: {},
            scoreWeight: 6,
          }));
          return {
            profile: buildProfileFromDraft(draft),
            skills: buildSkillsFromDraft(draft, state.skills),
            habits,
          };
        }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setScoreRange: (scoreRange) => set({ scoreRange }),
      setSelectedSkillId: (selectedSkillId) => set({ selectedSkillId }),
      toggleHabit: (habitId) =>
        set((state) => {
          const today = toDateKey();
          const target = state.habits.find((habit) => habit.id === habitId);
          if (!target) return state;
          const isDone = target.completedDates.includes(today);
          const habits = state.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  completedDates: isDone ? habit.completedDates.filter((date) => date !== today) : [...habit.completedDates, today],
                  streak: isDone ? Math.max(0, habit.streak - 1) : habit.streak + 1,
                }
              : habit,
          );
          const nextData = {
            ...state,
            habits,
            attributes: applyHabitImpact(target, isDone ? -1 : 1, state),
          };
          return { ...nextData, ...recalcMeta(nextData) };
        }),
      toggleBig3: (taskId) =>
        set((state) => {
          const big3 = state.big3.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
          const nextData = { ...state, big3 };
          return { ...nextData, ...recalcMeta(nextData) };
        }),
      toggleQuest: (questId, type) =>
        set((state) => ({
          [type === 'side' ? 'sideQuests' : 'quickActions']:
            (type === 'side' ? state.sideQuests : state.quickActions).map((quest) =>
              quest.id === questId ? { ...quest, completed: !quest.completed } : quest,
            ),
        } as Partial<AppStore>)),
      addLog: (payload) =>
        set((state) => {
          const log: DailyLog = {
            id: crypto.randomUUID(),
            date: toDateKey(),
            ...payload,
          };
          const nextData = {
            ...state,
            logs: [log, ...state.logs],
            lastActiveDate: toDateKey(),
            attributes: applyLogImpact(log, state),
            messages: [
              {
                id: crypto.randomUUID(),
                date: toDateKey(),
                tone: state.profile.notificationTone,
                message:
                  log.category === 'waste / distraction' || log.category === 'negative behavior'
                    ? 'This is not aligned with what you said you want to build.'
                    : 'Good entry. Momentum is shaped by repeated proof.',
              },
              ...state.messages,
            ].slice(0, 8),
          };
          return { ...nextData, ...recalcMeta(nextData) };
        }),
      addCheckIn: (payload) =>
        set((state) => {
          const checkIn: CheckIn = { id: crypto.randomUUID(), date: toDateKey(), ...payload };
          const nextData = {
            ...state,
            checkIns: [checkIn, ...state.checkIns.filter((item) => item.date !== checkIn.date)],
            lastActiveDate: toDateKey(),
          };
          return { ...nextData, ...recalcMeta(nextData) };
        }),
      addQuest: (type, title, description) =>
        set((state) => {
          const quest: Quest = {
            id: crypto.randomUUID(),
            title,
            type,
            completed: false,
            energy: 'medium',
            description,
          };
          return type === 'side'
            ? { sideQuests: [quest, ...state.sideQuests] }
            : { quickActions: [quest, ...state.quickActions] };
        }),
      updateMainQuest: (title, description) =>
        set((state) => ({
          mainQuest: {
            ...state.mainQuest,
            title,
            description,
          },
          profile: {
            ...state.profile,
            currentPhase: title,
          },
        })),
            addBig3Task: (title) =>
        set((state) => {
          const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            energy: 'medium',
            priority: 'core',
            date: toDateKey(),
          };

          const next = [...state.big3, newTask].slice(-3);
          const nextData = { ...state, big3: next };
          return { ...nextData, ...recalcMeta(nextData) };
        }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useLevelMeta = () => {
  const xp = useAppStore((state) => state.xp);
  return calculateLevel(xp);
};
