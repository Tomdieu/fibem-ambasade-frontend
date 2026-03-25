import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = { title: "Guinée-Bissau" };

export default async function GuineeBissauPage() {
  const t = await getI18n();

  const SECTION_CARDS = [
    {
      href: "/guinee-bissau/presentation",
      title: t("pages_content.guinea.presentation"),
      description:
        "Découvrez la géographie, l'histoire politique et les données essentielles de la République de Guinée-Bissau.",
    },
    {
      href: "/guinee-bissau/culture",
      title: t("pages_content.guinea.culture"),
      description:
        "Explorez la richesse culturelle, la gastronomie, la musique et les sites touristiques incontournables du pays.",
    },
    {
      href: "/guinee-bissau/economie",
      title: t("pages_content.guinea.economy"),
      description:
        "Informez-vous sur les secteurs économiques, les relations commerciales et les opportunités d'investissement.",
    },
    {
      href: "/guinee-bissau/actualites",
      title: t("pages_content.guinea.news"),
      description:
        "Suivez les dernières nouvelles et événements relatifs à la Guinée-Bissau et à son ambassade en France.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.guinea.title")}
          subtitle={t("pages_content.guinea.subtitle")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.guinea.title") },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-8">
          <p className="text-[var(--color-text-body)] text-base leading-relaxed max-w-3xl">
            {t("pages_content.guinea.description")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {SECTION_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-6 transition-shadow hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-[var(--color-gb-dark)] group-hover:text-[var(--color-gb-red)] transition-colors">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {card.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--color-gb-red)]">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
