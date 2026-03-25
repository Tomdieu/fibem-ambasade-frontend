import { formatDate } from "@/lib/utils";

interface AuditEvent {
  action: string;
  agentName: string;
  timestamp: Date;
  color: "green" | "red" | "amber" | "blue" | "gray";
}

interface AuditTimelineProps {
  events: AuditEvent[];
}

const dotColorMap: Record<AuditEvent["color"], string> = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  gray: "bg-gray-400",
};

export function AuditTimeline({ events }: AuditTimelineProps) {
  return (
    <div className="relative space-y-4">
      <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />
      {events.map((event, index) => (
        <div key={index} className="flex gap-3">
          <div
            className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 z-10 ${dotColorMap[event.color]}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 leading-snug">{event.action}</p>
            <p className="text-xs text-muted-foreground mt-0.5">par {event.agentName}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(event.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
