import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Actualités" };

const NEWS_ARTICLES = [
  {
    category: "Diplomatie",
    date: "18 mars 2026",
    title: "Rencontre bilatérale entre les ministres des Affaires étrangères de France et de Guinée-Bissau",
    excerpt:
      "Le ministre des Affaires étrangères de Guinée-Bissau a rencontré son homologue français à Paris pour renforcer les liens diplomatiques et discuter des enjeux régionaux en Afrique de l'Ouest.",
  },
  {
    category: "Culture",
    date: "10 mars 2026",
    title: "Festival de la diaspora bissau-guinéenne : édition 2026 à Paris",
    excerpt:
      "La communauté bissau-guinéenne de France se mobilise pour célébrer son patrimoine culturel lors d'un festival annuel réunissant musique, gastronomie et artisanat traditionnel au cœur de Paris.",
  },
  {
    category: "Économie",
    date: "2 mars 2026",
    title: "La Guinée-Bissau enregistre une hausse record de ses exportations de noix de cajou",
    excerpt:
      "Selon les derniers chiffres du ministère du Commerce, les exportations de noix de cajou ont augmenté de 12 % en 2025, portées par une demande mondiale soutenue et des réformes structurelles.",
  },
  {
    category: "Services",
    date: "25 février 2026",
    title: "Nouveaux horaires consulaires à partir du 1er avril 2026",
    excerpt:
      "L'Ambassade de Guinée-Bissau en France annonce une extension de ses horaires d'accueil consulaire pour mieux servir la communauté et réduire les délais de traitement des demandes.",
  },
  {
    category: "Développement",
    date: "15 février 2026",
    title: "Lancement d'un programme de coopération pour l'électrification rurale",
    excerpt:
      "Un nouveau partenariat entre la Guinée-Bissau et des bailleurs de fonds internationaux permettra d'électrifier 50 villages ruraux grâce à des installations solaires photovoltaïques d'ici 2027.",
  },
  {
    category: "Tourisme",
    date: "5 février 2026",
    title: "L'Archipel des Bijagos désigné destination écotouristique de l'année par l'OMT",
    excerpt:
      "L'Organisation mondiale du tourisme a distingué l'Archipel des Bijagos pour ses efforts exemplaires en matière de tourisme durable et de préservation de la biodiversité marine.",
  },
];

export default function ActualitesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Actualités"
          subtitle="Les dernières nouvelles de la Guinée-Bissau"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Guinée-Bissau", href: "/guinee-bissau" },
            { label: "Actualités" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <div
                key={article.title}
                className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-5 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-[var(--color-gb-red)]/10 text-[var(--color-gb-red)] text-xs px-2 py-0.5 rounded font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {article.date}
                  </span>
                </div>
                <p className="text-base font-medium mt-2 text-[var(--color-gb-dark)] leading-snug">
                  {article.title}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-3 leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <Link
                  href="#"
                  className="text-[var(--color-gb-red)] text-sm mt-3 block font-medium hover:underline"
                >
                  Lire la suite →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
