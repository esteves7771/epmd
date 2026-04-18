import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { TopHeader } from './TopHeader';

export const AppShell = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-hero-gradient text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <TopHeader title={title} subtitle={subtitle} />
        <main className="safe-pb flex-1 px-4 pb-28 pt-3">
          <div className="space-y-5">{children}</div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
};
