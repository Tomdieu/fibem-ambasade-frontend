import { Skeleton } from "@/components/ui/skeleton";

export function NewsSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border rounded-card overflow-hidden"
        >
          {/* Image placeholder */}
          <Skeleton className="aspect-video w-full rounded-none" />

          {/* Category badge */}
          <Skeleton className="h-5 w-20 rounded mt-3 mx-3" />

          {/* Date */}
          <Skeleton className="h-3 w-24 rounded mt-1 mx-3" />

          {/* Title */}
          <Skeleton className="h-5 w-full rounded mt-2 mx-3" style={{ width: "calc(100% - 1.5rem)" }} />
          <Skeleton className="h-5 w-3/4 rounded mt-1 mx-3" />

          {/* Excerpt */}
          <Skeleton className="h-3 w-full rounded mt-2 mx-3" style={{ width: "calc(100% - 1.5rem)" }} />
          <Skeleton className="h-3 w-full rounded mt-1 mx-3" style={{ width: "calc(100% - 1.5rem)" }} />
          <Skeleton className="h-3 w-2/3 rounded mt-1 mx-3" />

          {/* Link */}
          <Skeleton className="h-4 w-24 rounded mt-3 mx-3 mb-4" />
        </div>
      ))}
    </div>
  );
}
