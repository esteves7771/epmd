import { Clock3 } from 'lucide-react';
import type { DailyLog } from '@/types';
import { formatShortDate } from '@/utils/date';

export const RecentActivityFeed = ({ logs }: { logs: DailyLog[] }) => (
  <div className="surface rounded-[1.75rem] p-4">
    <div className="space-y-3">
      {logs.slice(0, 5).map((log) => (
        <div key={log.id} className="surface-soft rounded-[1.2rem] p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium tracking-[-0.01em] text-text">{log.title}</div>
              <div className="mt-1 text-[12px] text-muted">{log.category} · {log.intensity} · {log.duration} min</div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted"><Clock3 size={12} /> {formatShortDate(log.date)}</div>
          </div>
          {log.note && <div className="mt-2 text-[13px] leading-5 text-muted">{log.note}</div>}
        </div>
      ))}
    </div>
  </div>
);
