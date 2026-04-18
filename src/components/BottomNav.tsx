import { BarChart3, ClipboardPen, Home, ScrollText, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import type { AppTab } from '@/types';

const items: { key: AppTab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'skills', label: 'Skills', icon: BarChart3 },
  { key: 'log', label: 'Log', icon: ClipboardPen },
  { key: 'quests', label: 'Quests', icon: Swords },
  { key: 'review', label: 'Review', icon: ScrollText },
];

export const BottomNav = () => {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  return (
    <nav className="glass fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-white/5 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_40px_rgba(0,0,0,0.35)]">
      <div className="grid grid-cols-5 gap-2">
        {items.map(({ key, label, icon: Icon }) => {
          const active = key === activeTab;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="tap relative flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[1.15rem] text-[11px] font-medium text-muted transition"
            >
              {active && <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-[1.15rem] border border-white/8 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />}
              <Icon size={18} className={active ? 'relative text-accent2' : 'relative'} />
              <span className={active ? 'relative text-text' : 'relative'}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
