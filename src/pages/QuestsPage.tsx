import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Big3List } from '@/components/Big3List';
import { HabitTile } from '@/components/HabitTile';
import { QuestCard } from '@/components/QuestCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import { toDateKey } from '@/utils/date';

export const QuestsPage = () => {
  const mainQuest = useAppStore((s) => s.mainQuest);
  const sideQuests = useAppStore((s) => s.sideQuests);
  const quickActions = useAppStore((s) => s.quickActions);
  const big3 = useAppStore((s) => s.big3);
  const habits = useAppStore((s) => s.habits);
  const toggleBig3 = useAppStore((s) => s.toggleBig3);
  const toggleQuest = useAppStore((s) => s.toggleQuest);
  const toggleHabit = useAppStore((s) => s.toggleHabit);
  const addQuest = useAppStore((s) => s.addQuest);
  const updateMainQuest = useAppStore((s) => s.updateMainQuest);
  const addBig3Task = useAppStore((s) => s.addBig3Task);

  const [mainTitle, setMainTitle] = useState(mainQuest.title);
  const [mainDescription, setMainDescription] = useState(mainQuest.description);
  const [newQuest, setNewQuest] = useState('');
  const [newQuick, setNewQuick] = useState('');
  const [newBig3, setNewBig3] = useState('');

  return (
    <AppShell title="Quests" subtitle="Direct your effort with visible structure">
      <div className="space-y-5">
        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="Main quest" subtitle="Dominant current life focus" />
          <div className="mt-4 space-y-3">
            <input value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} className="input-shell" />
            <textarea value={mainDescription} onChange={(e) => setMainDescription(e.target.value)} rows={3} className="input-shell min-h-[96px] resize-none" />
            <button onClick={() => updateMainQuest(mainTitle, mainDescription)} className="primary-button w-full">Update main quest</button>
          </div>
        </div>

        <SectionHeader title="Big 3" subtitle="Core tasks for today" />
        <Big3List tasks={big3} onToggle={toggleBig3} />
        <InlineAdder value={newBig3} setValue={setNewBig3} placeholder="Add new Big 3 item" buttonLabel="Add" helper="The list stays capped at 3 for focus." onAdd={() => { if (newBig3.trim()) { addBig3Task(newBig3.trim()); setNewBig3(''); } }} />

        <SectionHeader title="Habits" subtitle="One tap reinforcement" />
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitTile key={habit.id} habit={habit} done={habit.completedDates.includes(toDateKey())} onToggle={() => toggleHabit(habit.id)} />
          ))}
        </div>

        <SectionHeader title="Side quests" subtitle="Secondary missions" />
        <div className="space-y-3">
          {sideQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id, 'side')} />
          ))}
        </div>
        <InlineAdder value={newQuest} setValue={setNewQuest} placeholder="Add side quest" buttonLabel="Add" onAdd={() => { if (newQuest.trim()) { addQuest('side', newQuest.trim(), 'User added side quest'); setNewQuest(''); } }} />

        <SectionHeader title="Quick actions" subtitle="Useful low energy actions" />
        <div className="space-y-3">
          {quickActions.map((quest) => (
            <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id, 'quick')} />
          ))}
        </div>
        <InlineAdder value={newQuick} setValue={setNewQuick} placeholder="Add quick action" buttonLabel="Add" onAdd={() => { if (newQuick.trim()) { addQuest('quick', newQuick.trim(), 'User added quick action'); setNewQuick(''); } }} />
      </div>
    </AppShell>
  );
};

const InlineAdder = ({ value, setValue, placeholder, onAdd, buttonLabel, helper }: { value: string; setValue: (value: string) => void; placeholder: string; onAdd: () => void; buttonLabel: string; helper?: string }) => (
  <div className="surface rounded-[1.5rem] p-4">
    <div className="flex gap-2">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="input-shell flex-1" />
      <button onClick={onAdd} className="secondary-button min-w-[78px]">{buttonLabel}</button>
    </div>
    {helper ? <p className="mt-2 text-[12px] text-muted">{helper}</p> : null}
  </div>
);
