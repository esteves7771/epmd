import { HomePage } from '@/pages/HomePage';
import { LogPage } from '@/pages/LogPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { QuestsPage } from '@/pages/QuestsPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { useAppStore } from '@/store/useAppStore';

const App = () => {
  const completedOnboarding = useAppStore((s) => s.profile.completedOnboarding);
  const activeTab = useAppStore((s) => s.activeTab);

  if (!completedOnboarding) return <OnboardingPage />;

  switch (activeTab) {
    case 'skills':
      return <SkillsPage />;
    case 'log':
      return <LogPage />;
    case 'quests':
      return <QuestsPage />;
    case 'review':
      return <ReviewPage />;
    case 'settings':
      return <SettingsPage />;
    case 'home':
    default:
      return <HomePage />;
  }
};

export default App;
