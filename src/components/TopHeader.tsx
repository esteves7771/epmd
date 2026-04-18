import { BellRing, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export const TopHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-bg/80 px-4 pb-4 pt-4 backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent2/80">EPMD</div>
          <h1 className="mt-2 text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.04em] text-text">{title}</h1>
          {subtitle && <p className="mt-2 max-w-[22rem] text-[13px] leading-5 text-muted">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <motion.button whileTap={{ scale: 0.96 }} className="surface-soft rounded-[1.1rem] p-3 text-muted transition hover:text-text">
            <BellRing size={18} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} className="surface-soft rounded-[1.1rem] p-3 text-muted transition hover:text-text" onClick={() => setActiveTab('settings')}>
            <Settings2 size={18} />
          </motion.button>
        </div>
      </div>
    </header>
  );
};
