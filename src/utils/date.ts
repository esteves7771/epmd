export const toDateKey = (input = new Date()) => {
  const d = new Date(input);
  return d.toISOString().slice(0, 10);
};

export const daysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return toDateKey(d);
};

export const formatShortDate = (value: string) =>
  new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));

export const isToday = (value: string) => value === toDateKey();

export const diffDays = (a: string, b: string) => {
  const ms = new Date(a).getTime() - new Date(b).getTime();
  return Math.round(ms / 86400000);
};
