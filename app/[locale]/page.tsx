import { Suspense } from "react";
import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CountrySpotlight } from "@/components/home/country-spotlight";
import { HeroSection } from "@/components/home/hero-section";
import { NewsSection } from "@/components/home/news-section";
import type { NewsPost } from "@/components/home/news-section";
import { NewsSectionSkeleton } from "@/components/home/news-section-skeleton";
import { ServicesStrip } from "@/components/home/services-strip";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Site officiel de l'Ambassade de la République de Guinée-Bissau en France. Retrouvez tous les services consulaires, visas, passeports et informations diplomatiques.",
};

const mockPosts: NewsPost[] = [
  {
    category: "Communiqué",
    date: new Date("2026-03-15"),
    title:
      "Ouverture de la nouvelle procédure de demande de visa en ligne",
    excerpt:
      "L'Ambassade de Guinée-Bissau en France annonce le lancement de sa nouvelle plateforme de dépôt de demandes de visa entièrement en ligne, simplifiant les démarches pour les ressortissants français.",
    href: "/actualites/nouvelle-procedure-visa-en-ligne",
  },
  {
    category: "Événement",
    date: new Date("2026-03-08"),
    title:
      "Célébration de la Journée internationale des femmes à l'Ambassade",
    excerpt:
      "À l'occasion du 8 mars, l'Ambassade de Guinée-Bissau en France a organisé une soirée culturelle mettant à l'honneur les femmes guinéennes et leur contribution au développement du pays.",
    href: "/actualites/journee-internationale-femmes-2026",
  },
  {
    category: "Information",
    date: new Date("2026-02-20"),
    title: "Mise à jour des horaires d'ouverture consulaire",
    excerpt:
      "Suite à des travaux de rénovation, les horaires d'accueil du public sont temporairement modifiés. Retrouvez les nouveaux créneaux disponibles pour vos rendez-vous consulaires.",
    href: "/actualites/mise-a-jour-horaires-consulaires",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesStrip />
        <section className="py-section bg-white">
          <div className="max-w-7xl mx-auto px-container">
            <Suspense fallback={<NewsSectionSkeleton />}>
              <NewsSection posts={mockPosts} />
            </Suspense>
          </div>
        </section>
        <CountrySpotlight />
      </main>
      <Footer />
    </>
  );
}
