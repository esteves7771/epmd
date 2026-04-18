export type Frequency = 'daily' | 'weekdays' | 'custom';
export type AppTab = 'home' | 'skills' | 'log' | 'quests' | 'review' | 'settings';
export type Intensity = 'light' | 'medium' | 'strong';
export type LogCategory =
  | 'deep work'
  | 'training'
  | 'learning'
  | 'social'
  | 'rest'
  | 'leisure'
  | 'waste / distraction'
  | 'negative behavior'
  | 'habit'
  | 'quest progress';

export type NotificationTone = 'soft' | 'neutral' | 'firm' | 'aggressive' | 'adaptive';

export interface IdentityProfile {
  characterName: string;
  idealIdentity: string;
  coreValues: string[];
  longTermGoals: string[];
  strengthenBehaviors: string[];
  reduceBehaviors: string[];
}

export interface CurrentStateProfile {
  focus: number;
  discipline: number;
  health: number;
  social: number;
  energy: number;
  lifePhase: string;
}

export interface UserProfile {
  id: string;
  completedOnboarding: boolean;
  identity: IdentityProfile;
  currentState: CurrentStateProfile;
  currentPhase: string;
  notificationTone: NotificationTone;
  rank: string;
}

export interface Attribute {
  id: string;
  name: 'Strength' | 'Focus' | 'Discipline' | 'Social' | 'Health';
  score: number;
  trend: number;
  description: string;
}

export interface SkillMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  rank: string;
  progress: number;
  effortXp: number;
  achievementProgress: number;
  streak: number;
  lastActivityDate: string;
  rustStatus: 'stable' | 'warming' | 'rusting';
  milestones: SkillMilestone[];
  relatedTaskIds: string[];
  notes: string[];
}

export interface Habit {
  id: string;
  name: string;
  category: string;
  frequency: Frequency;
  mode: 'reduced' | 'normal' | 'expanded';
  streak: number;
  completedDates: string[];
  impact: Partial<Record<Attribute['name'], number>>;
  scoreWeight: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  energy: 'low' | 'medium' | 'high';
  priority: 'core' | 'support' | 'recovery';
  date: string;
}

export interface Quest {
  id: string;
  title: string;
  type: 'main' | 'side' | 'quick';
  completed: boolean;
  energy: 'low' | 'medium' | 'high';
  description: string;
  dueLabel?: string;
}

export interface DailyLog {
  id: string;
  date: string;
  title: string;
  category: LogCategory;
  intensity: Intensity;
  quality: number;
  duration: number;
  note?: string;
}

export interface CheckIn {
  id: string;
  date: string;
  alignment: number;
  wentWell: string;
  drifted: string;
  fixNext: string;
}

export interface ScoreEntry {
  date: string;
  score: number;
  xp: number;
}

export interface SystemMessage {
  id: string;
  date: string;
  tone: NotificationTone;
  message: string;
}

export interface AppStateData {
  profile: UserProfile;
  attributes: Attribute[];
  skills: Skill[];
  habits: Habit[];
  mainQuest: Quest;
  big3: Task[];
  sideQuests: Quest[];
  quickActions: Quest[];
  logs: DailyLog[];
  checkIns: CheckIn[];
  scores: ScoreEntry[];
  messages: SystemMessage[];
  xp: number;
  usageStreak: number;
  alignedDayStreak: number;
  lastActiveDate: string;
}

export interface OnboardingDraft {
  characterName: string;
  idealIdentity: string;
  coreValues: string;
  longTermGoals: string;
  strengthenBehaviors: string;
  reduceBehaviors: string;
  focus: number;
  discipline: number;
  health: number;
  social: number;
  energy: number;
  lifePhase: string;
  skills: string[];
  habits: string[];
}
