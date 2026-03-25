"use client";

import Link from "next/link";

import { NewsCard } from "@/components/ui/news-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/locales/client";

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
  const t = useI18n();

  return (
    <div>
      <SectionHeading
        title={t("home_page.news_section_title")}
        action={
          <Link
            href="/actualites"
            className="text-gb-red text-sm"
          >
            {t("home_page.news_see_all")}
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
