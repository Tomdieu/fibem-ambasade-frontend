import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  category: string;
  date: Date;
  title: string;
  excerpt: string;
  href: string;
  imageUrl?: string;
}

export function NewsCard({
  category,
  date,
  title,
  excerpt,
  href,
  imageUrl,
}: NewsCardProps) {
  return (
    <div className="bg-white border rounded-[var(--radius-card)] overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <span className="bg-[var(--color-gb-red)]/10 text-[var(--color-gb-red)] text-xs px-2 py-0.5 rounded inline-block mt-3 mx-3">
        {category}
      </span>
      <p className="text-xs text-[var(--color-text-muted)] mx-3 mt-1">
        {formatDate(date)}
      </p>
      <p className="text-base font-medium line-clamp-2 mx-3 mt-2">{title}</p>
      <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mx-3 mt-1">
        {excerpt}
      </p>
      <Link
        href={href}
        className="text-[var(--color-gb-red)] text-sm mx-3 mt-3 mb-4 block"
      >
        Lire la suite →
      </Link>
    </div>
  );
}
