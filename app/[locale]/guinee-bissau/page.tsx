import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Guinée-Bissau" };

const SECTION_CARDS = [
  {
    href: "/guinee-bissau/presentation",
    title: "Présentation",
    description:
      "Découvrez la géographie, l'histoire politique et les données essentielles de la République de Guinée-Bissau.",
  },
  {
    href: "/guinee-bissau/culture",
    title: "Culture & Tourisme",
    description:
      "Explorez la richesse culturelle, la gastronomie, la musique et les sites touristiques incontournables du pays.",
  },
  {
    href: "/guinee-bissau/economie",
    title: "Économie",
    description:
      "Informez-vous sur les secteurs économiques, les relations commerciales et les opportunités d'investissement.",
  },
  {
    href: "/guinee-bissau/actualites",
    title: "Actualités",
    description:
      "Suivez les dernières nouvelles et événements relatifs à la Guinée-Bissau et à son ambassade en France.",
  },
];

export default function GuineeBissauPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Guinée-Bissau"
          subtitle="Découvrez la République de Guinée-Bissau"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Guinée-Bissau" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-8">
          <p className="text-[var(--color-text-body)] text-base leading-relaxed max-w-3xl">
            La République de Guinée-Bissau est un pays d&apos;Afrique de
            l&apos;Ouest bordé par le Sénégal au nord, la Guinée à l&apos;est et
            au sud, et l&apos;océan Atlantique à l&apos;ouest. Malgré sa
            superficie modeste, elle possède une diversité culturelle, naturelle
            et humaine remarquable.
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
