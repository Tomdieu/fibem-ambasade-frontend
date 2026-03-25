import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Culture & Tourisme" };

const ATTRACTIONS = [
  {
    name: "Archipel des Bijagos",
    description:
      "Classé réserve de biosphère par l'UNESCO, cet archipel de 88 îles abrite une biodiversité exceptionnelle et la culture mystérieuse du peuple Bijago, réputé pour ses rites d'initiation et ses masques sacrés.",
  },
  {
    name: "Parc national de Cantanhez",
    description:
      "Cette forêt tropicale humide du sud du pays est l'un des derniers refuges des chimpanzés en Afrique de l'Ouest. Ses paysages de mangroves et de forêts denses en font un site incontournable pour l'écotourisme.",
  },
  {
    name: "Îles Orango",
    description:
      "Au cœur de l'archipel des Bijagos, les Îles Orango abritent une population unique de crocodiles d'eau salée et offrent des plages immaculées, des lagons turquoise et une rencontre authentique avec la culture bijago.",
  },
];

export default function CulturePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Culture & Tourisme"
          subtitle="Le patrimoine vivant de la Guinée-Bissau"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Guinée-Bissau", href: "/guinee-bissau" },
            { label: "Culture & Tourisme" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-10">
          {/* Patrimoine culturel */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Patrimoine culturel
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed mb-4">
              La Guinée-Bissau est habitée par une mosaïque de peuples aux
              traditions riches et variées. Les Mandingues, présents
              principalement dans le nord-est du pays, sont réputés pour
              leur tradition orale transmise par les griots, gardiens de la
              mémoire collective. Leurs masques, sculptures et tissages
              témoignent d&apos;un savoir-faire artisanal raffiné, tandis
              que leurs cérémonies de circoncision marquent des étapes
              importantes du cycle de vie.
            </p>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              Les Balanta, le groupe ethnique le plus nombreux, se distinguent
              par leur organisation sociale horizontale et leurs pratiques
              agricoles liées à la culture du riz en rizières inondées. Les
              Fula, présents dans le Futa Djalon, ont apporté l&apos;islam
              et une forte tradition d&apos;élevage. La coexistence pacifique
              de ces cultures constitue l&apos;une des grandes richesses
              humaines du pays.
            </p>
          </div>

          {/* Gastronomie */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Gastronomie
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              La cuisine bissau-guinéenne est généreuse et savoureuse,
              fortement influencée par les produits locaux : riz, poisson,
              fruits de mer, légumes tropicaux et huile de palme. Le
              &laquo;&nbsp;caldo de mancarra&nbsp;&raquo; (ragoût à
              l&apos;arachide) est un plat national emblématique, souvent
              servi avec du riz blanc ou du fonio. Le &laquo;&nbsp;pirao&nbsp;&raquo;,
              bouillie épaisse de farine de manioc, accompagne de nombreux
              plats en sauce. Les poissons grillés sur braise, les crevettes
              fraîches et les huîtres de mangrove sont des délices
              incontournables, surtout dans les régions côtières.
            </p>
          </div>

          {/* Sites touristiques */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Sites touristiques
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ATTRACTIONS.map((attraction) => (
                <div
                  key={attraction.name}
                  className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="size-5 text-[var(--color-gb-red)] shrink-0" />
                    <h3 className="font-semibold text-[var(--color-gb-dark)]">
                      {attraction.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {attraction.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Musique */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Musique
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              La Guinée-Bissau possède une scène musicale vibrante dont le
              style le plus emblématique est le <strong>gumbé</strong> —
              rythme syncopé métissant influences africaines et caribéennes,
              né de la rencontre entre les communautés repatriées du Brésil
              et les cultures locales au XIXe siècle. Le gumbé est joué
              lors des fêtes populaires, des mariages et des cérémonies
              traditionnelles. D&apos;autres styles comme le <em>tina</em> et
              le <em>kussundé</em> témoignent de la vitalité de la création
              musicale bissau-guinéenne, célébrée chaque année lors de
              festivals nationaux et internationaux.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
