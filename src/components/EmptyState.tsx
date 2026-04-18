export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="surface rounded-3xl p-6 text-center">
    <div className="text-lg font-semibold text-text">{title}</div>
    <div className="mt-2 text-sm text-muted">{description}</div>
  </div>
);
