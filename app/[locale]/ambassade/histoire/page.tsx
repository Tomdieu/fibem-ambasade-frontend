import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Histoire" };

const TIMELINE = [
  {
    year: "1974",
    title: "Reconnaissance diplomatique",
    content:
      "À la suite de l'indépendance de la Guinée-Bissau proclamée le 24 septembre 1973 et reconnue internationalement en 1974, la France établit des relations diplomatiques officielles avec le nouvel État. Cette reconnaissance marque le point de départ d'une coopération bilatérale qui allait se développer progressivement au fil des décennies. Les premiers échanges diplomatiques sont facilités par la position de la France au sein de la communauté internationale et son engagement en faveur de la décolonisation.",
  },
  {
    year: "1980",
    title: "Consolidation des liens bilatéraux",
    content:
      "Au cours des années 1980, les relations franco-bissau-guinéennes se consolident avec la signature de plusieurs accords de coopération dans les domaines de l'aide au développement, de l'éducation et de la santé. La France devient l'un des principaux partenaires au développement de la Guinée-Bissau, apportant un soutien technique et financier à des projets structurants. L'Ambassade, désormais pleinement opérationnelle à Paris, joue un rôle central dans la coordination de cette coopération bilatérale croissante.",
  },
  {
    year: "1998",
    title: "Soutien en période de crise",
    content:
      "Lors du conflit politico-militaire qui secoue la Guinée-Bissau en 1998-1999, la France apporte son soutien à l'effort de médiation internationale mené par la CEDEAO. L'Ambassade à Paris devient un lieu important de dialogue et de coordination diplomatique, facilitant les contacts entre le gouvernement bissau-guinéen et les instances européennes et internationales. La France contribue également à l'aide humanitaire destinée aux populations affectées par le conflit, renforçant ainsi les liens de solidarité entre les deux nations.",
  },
  {
    year: "2010",
    title: "Nouvelle ère de coopération",
    content:
      "Les années 2010 marquent une nouvelle ère dans les relations franco-bissau-guinéennes, caractérisée par un approfondissement des liens économiques et culturels. De nouveaux accords de coopération sont signés dans des secteurs prioritaires tels que l'agriculture, la gestion des ressources halieutiques et le développement urbain. Les échanges universitaires et culturels s'intensifient, favorisant une meilleure connaissance mutuelle entre les deux peuples. La communauté bissau-guinéenne en France, de plus en plus nombreuse, joue un rôle croissant de pont entre les deux pays.",
  },
  {
    year: "2020",
    title: "Partenariat renforcé pour l'avenir",
    content:
      "Dans le contexte des défis globaux posés par la pandémie de Covid-19 et les enjeux climatiques, la France et la Guinée-Bissau réaffirment leur partenariat stratégique. Des consultations régulières entre les deux gouvernements permettent de coordonner les réponses aux crises et d'identifier de nouvelles perspectives de coopération. L'Ambassade, dotée de moyens modernes et d'une équipe renforcée, poursuit sa mission de rapprochement des deux peuples et de promotion des intérêts communs dans un monde en mutation accélérée.",
  },
];

export default function HistoirePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Histoire"
          subtitle="Les relations diplomatiques franco-bissau-guinéennes"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "L'Ambassade", href: "/ambassade" },
            { label: "Histoire" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          <div className="prose max-w-none">
            <p className="text-text-muted">
              Depuis l'indépendance de la Guinée-Bissau, les relations diplomatiques avec la France ont
              connu plusieurs étapes marquantes qui ont progressivement forgé un partenariat solide et
              multidimensionnel.
            </p>
          </div>
          <div className="space-y-8">
            {TIMELINE.map((era) => (
              <div
                key={era.year}
                className="border-l-2 border-surface-muted pl-6 relative"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-gb-red" />
                <p className="text-gb-red font-bold text-xl mb-1">{era.year}</p>
                <h2 className="text-lg font-medium text-text-body mb-2">{era.title}</h2>
                <div className="prose max-w-none">
                  <p className="text-text-muted">{era.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
