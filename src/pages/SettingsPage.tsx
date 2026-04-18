import { AppShell } from '@/components/AppShell';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import type { NotificationTone } from '@/types';

const tones: NotificationTone[] = ['soft', 'neutral', 'firm', 'aggressive', 'adaptive'];

export const SettingsPage = () => {
  const profile = useAppStore((s) => s.profile);
  const messages = useAppStore((s) => s.messages);
  const startFresh = useAppStore((s) => s.startFresh);

  return (
    <AppShell title="Settings & profile" subtitle="Local demo storage and system tone">
      <div className="space-y-5">
        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="Character" subtitle="Your declared direction" />
          <div className="mt-4 space-y-3 text-sm text-muted">
            <Row label="Character name" value={profile.identity.characterName} />
            <Row label="Ideal identity" value={profile.identity.idealIdentity} />
            <Row label="Core values" value={profile.identity.coreValues.join(', ')} />
            <Row label="Long term goals" value={profile.identity.longTermGoals.join(', ')} />
          </div>
        </div>

        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="Notification style" subtitle="UI mock for future real notifications" />
          <div className="mt-4 flex flex-wrap gap-2">
            {tones.map((tone) => (
              <div key={tone} className={`rounded-full px-4 py-2 text-sm ${profile.notificationTone === tone ? 'bg-accent text-white' : 'bg-white/5 text-muted'}`}>
                {tone}
              </div>
            ))}
          </div>
        </div>

        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="Recent system messages" subtitle="Message tone examples" />
          <div className="mt-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="rounded-[1rem] bg-white/5 p-3 text-[13px] leading-6 text-text">{message.message}</div>
            ))}
          </div>
        </div>

        <div className="surface rounded-[1.75rem] p-4">
          <SectionHeader title="Storage" subtitle="Local only for now" />
          <p className="mt-4 text-[13px] leading-6 text-muted">This demo persists to localStorage under versioned app data. It can later migrate to Firebase or Supabase with the same domain model.</p>
          <button onClick={startFresh} className="mt-4 w-full rounded-[1.35rem] border border-danger/30 bg-danger/10 px-4 py-4 text-sm text-danger">Reset demo and reseed local data</button>
        </div>
      </div>
    </AppShell>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[1rem] bg-white/5 p-3">
    <div className="text-[10px] uppercase tracking-[0.18em] text-muted">{label}</div>
    <div className="mt-1 text-[14px] text-text">{value}</div>
  </div>
);
