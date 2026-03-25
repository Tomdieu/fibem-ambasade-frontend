import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Présentation — Guinée-Bissau" };

const KEY_FACTS = [
  { label: "Superficie", value: "36 125 km²" },
  { label: "Population", value: "2,1 millions" },
  { label: "Capitale", value: "Bissau" },
  { label: "Langue officielle", value: "Portugais" },
];

export default function PresentationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Présentation"
          subtitle="Données essentielles sur la République de Guinée-Bissau"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Guinée-Bissau", href: "/guinee-bissau" },
            { label: "Présentation" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-10">
          {/* Key facts grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {KEY_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 text-center"
              >
                <p className="text-2xl font-bold text-[var(--color-gb-red)]">
                  {fact.value}
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

          {/* Géographie */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Géographie
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              La Guinée-Bissau est un pays côtier d&apos;Afrique de
              l&apos;Ouest, caractérisé par un littoral découpé de nombreux
              estuaires, de mangroves et d&apos;un archipel d&apos;environ
              88 îles — les Îles Bijagos — classées réserve de biosphère par
              l&apos;UNESCO. Le territoire continental présente un relief peu
              accidenté, principalement constitué de plaines côtières et de
              collines dans la région orientale. Les fleuves Geba et Corubal
              traversent le pays et jouent un rôle vital dans
              l&apos;agriculture et les transports locaux.
            </p>
          </div>

          {/* Politique */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Politique
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              La Guinée-Bissau est une République semi-présidentielle dont le
              chef d&apos;État est le Président de la République et le chef de
              gouvernement est le Premier ministre. Le pays a obtenu son
              indépendance du Portugal le 24 septembre 1973, déclarée
              officiellement le 10 septembre 1974. Le Parlement, appelé
              Assemblée Nationale Populaire, est composé de 102 membres élus
              au suffrage universel direct. La Constitution de 1984, révisée
              à plusieurs reprises, garantit les droits fondamentaux des
              citoyens et l&apos;organisation des institutions de
              l&apos;État. Le pays est membre de la CEDEAO, de
              l&apos;Union africaine et de la CPLP (Communauté des pays de
              langue portugaise).
            </p>
          </div>

          {/* Religions et cultures */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Religions et cultures
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              La Guinée-Bissau est un pays pluriethnique et plurireligieux
              d&apos;une grande diversité. L&apos;islam est la religion
              majoritaire, pratiquée par environ 45 % de la population,
              suivi des religions traditionnelles africaines (animisme) avec
              quelque 30 %, et du christianisme avec environ 10 %. Le
              syncrétisme religieux est courant, beaucoup de Bissau-Guinéens
              associant pratiques islamiques ou chrétiennes aux croyances
              ancestrales. Le pays compte plus de 20 groupes ethniques
              principaux, parmi lesquels les Balanta (le groupe le plus
              nombreux), les Fula, les Mandingue, les Papel et les Bijagos.
              Chaque ethnie possède sa propre langue, ses traditions et son
              patrimoine culturel, faisant de la Guinée-Bissau un véritable
              carrefour de cultures.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
