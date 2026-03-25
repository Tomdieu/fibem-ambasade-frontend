import { cn, getStatusConfig } from "@/lib/utils";
import { StatusType } from "@/types";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-badge)] font-medium",
        config.className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"
      )}
    >
      {config.label}
    </span>
  );
}
