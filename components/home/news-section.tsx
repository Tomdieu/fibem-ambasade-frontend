import Link from "next/link";

import { NewsCard } from "@/components/ui/news-card";
import { SectionHeading } from "@/components/ui/section-heading";

export interface NewsPost {
  category: string;
  date: Date;
  title: string;
  excerpt: string;
  href: string;
  imageUrl?: string;
}

interface NewsSectionProps {
  posts: NewsPost[];
}

export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <div>
      <SectionHeading
        title="Actualités"
        action={
          <Link
            href="/actualites"
            className="text-gb-red text-sm"
          >
            Voir toutes les actualités →
          </Link>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post) => (
          <NewsCard
            key={post.href}
            category={post.category}
            date={post.date}
            title={post.title}
            excerpt={post.excerpt}
            href={post.href}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
