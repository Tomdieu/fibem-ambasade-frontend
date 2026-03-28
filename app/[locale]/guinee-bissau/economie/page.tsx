import type { Metadata } from "next";
import { TrendingUp, Fish, Factory } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Économie" };

const SECTORS = [
  {
    icon: <TrendingUp className="size-6 text-(--color-gb-blue)" />,
    title: "Agriculture",
    description:
      "La noix de cajou constitue la principale culture d'exportation, représentant plus de 85 % des revenus d'exportation. La Guinée-Bissau est l'un des cinq premiers producteurs mondiaux. Le riz, le sorgho, le maïs et les arachides assurent la sécurité alimentaire locale.",
  },
  {
    icon: <Fish className="size-6 text-(--color-gb-blue)" />,
    title: "Pêche",
    description:
      "Les eaux territoriales de Guinée-Bissau sont parmi les plus poissonneuses d'Afrique de l'Ouest. Le secteur de la pêche, artisanale et industrielle, génère des recettes significatives grâce aux licences de pêche accordées à des flottes étrangères, notamment européennes et asiatiques.",
  },
  {
    icon: <Factory className="size-6 text-(--color-gb-blue)" />,
    title: "Industrie légère",
    description:
      "L'industrie bissau-guinéenne reste embryonnaire mais se développe progressivement, notamment dans la transformation des noix de cajou, la production de boissons, la menuiserie et la construction. Des initiatives de zones économiques spéciales visent à attirer des investissements étrangers.",
  },
];

const INVESTMENT_OPPORTUNITIES = [
  "Transformation des noix de cajou en produits à valeur ajoutée (beurre, farine, jus)",
  "Développement des infrastructures portuaires et logistiques",
  "Tourisme écologique dans l'archipel des Bijagos",
  "Énergies renouvelables (solaire, éolien) pour l'électrification rurale",
  "Aquaculture et pêche artisanale durable",
  "Agro-industrie et agriculture biologique certifiée",
];

export default function EconomiePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Économie"
          subtitle="Structure économique et perspectives de développement"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Guinée-Bissau", href: "/guinee-bissau" },
            { label: "Économie" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-10">
          {/* Overview */}
          <p className="text-[var(--color-text-body)] leading-relaxed max-w-3xl">
            Malgré les défis politiques des dernières décennies, la
            Guinée-Bissau dispose d&apos;atouts économiques considérables :
            des ressources naturelles abondantes, une façade maritime
            exceptionnelle et un potentiel agricole encore largement
            sous-exploité. Le pays est membre de l&apos;Union économique et
            monétaire ouest-africaine (UEMOA) et utilise le franc CFA comme
            monnaie nationale. Des réformes structurelles sont en cours
            pour diversifier l&apos;économie et réduire la dépendance aux
            exportations de noix de cajou.
          </p>

          {/* Secteurs principaux */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-4">
              Secteurs principaux
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SECTORS.map((sector) => (
                <div
                  key={sector.title}
                  className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-gb-blue)]/10">
                      {sector.icon}
                    </div>
                    <h3 className="font-semibold text-[var(--color-gb-dark)]">
                      {sector.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Relations commerciales avec la France */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Relations commerciales avec la France
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              La France entretient des liens économiques historiques avec la
              Guinée-Bissau, bien que le volume des échanges bilatéraux
              reste modeste en comparaison avec d&apos;autres partenaires
              régionaux. Des entreprises françaises sont présentes dans les
              secteurs des télécommunications, de l&apos;énergie et des
              services financiers. L&apos;Agence française de développement
              (AFD) soutient plusieurs projets d&apos;infrastructure et de
              développement social. La France est également l&apos;un des
              principaux contributeurs à l&apos;aide publique au développement
              destinée à la Guinée-Bissau, notamment dans les domaines de la
              santé, de l&apos;éducation et de la bonne gouvernance.
            </p>
          </div>

          {/* Opportunités d'investissement */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Opportunités d&apos;investissement
            </h2>
            <ul className="space-y-2">
              {INVESTMENT_OPPORTUNITIES.map((opportunity) => (
                <li
                  key={opportunity}
                  className="flex items-start gap-2 text-[var(--color-text-body)]"
                >
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--color-gb-blue)]" />
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
