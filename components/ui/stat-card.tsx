import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ElementType;
  trend?: number;
  color?: "red" | "green" | "amber" | "blue";
}

const colorMap = {
  red: "bg-red-50 text-red-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
};

export function StatCard({ label, value, icon: Icon, trend, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white border rounded-[var(--radius-card)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-medium">{value}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mt-1">
            {label}
          </p>
          {trend !== undefined && (
            <p
              className={cn(
                "text-xs mt-1",
                trend >= 0 ? "text-emerald-600" : "text-red-600"
              )}
            >
              {trend >= 0 ? `↑ ${trend}%` : `↓ ${Math.abs(trend)}%`}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              colorMap[color]
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
