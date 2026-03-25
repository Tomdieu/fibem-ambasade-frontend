interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-12 h-12 text-[var(--color-text-muted)] mb-4" />
      <p className="text-base font-medium">{title}</p>
      <p className="text-sm text-[var(--color-text-muted)] mt-1">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
