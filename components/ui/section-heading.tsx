import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  action,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", align === "center" && "flex-col items-center text-center")}>
      <div
        className={cn(
          align === "left" && "border-l-[3px] border-[var(--color-gb-red)] pl-3"
        )}
      >
        <h2 className="text-2xl font-medium text-[var(--color-gb-dark)]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
