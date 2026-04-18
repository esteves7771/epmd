import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const NextBestActionCard = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <motion.button whileTap={{ scale: 0.988 }} onClick={onPress} className="tap hero-card w-full rounded-[1.75rem] p-4 text-left shadow-glow">
    <div className="flex items-center justify-between gap-3">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent2">
        <Sparkles size={14} /> Next best action
      </div>
      <div className="rounded-full border border-white/10 bg-white/5 p-2 text-accent2">
        <ArrowRight size={16} />
      </div>
    </div>
    <div className="mt-3 text-[1.35rem] font-semibold leading-7 tracking-[-0.04em] text-text">{title}</div>
    <div className="mt-3 text-[13px] leading-6 text-muted">Take the highest leverage move now and keep momentum alive.</div>
  </motion.button>
);
