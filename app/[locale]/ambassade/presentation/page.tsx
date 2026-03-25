import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Présentation" };

export default function PresentationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Présentation"
          subtitle="Missions et attributions de l'Ambassade"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "L'Ambassade", href: "/ambassade" },
            { label: "Présentation" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          <div className="prose max-w-none space-y-6">
            <p>
              L'Ambassade de la République de Guinée-Bissau en France constitue la représentation diplomatique
              officielle de la République de Guinée-Bissau auprès du gouvernement de la République française.
              Établie conformément aux dispositions de la Convention de Vienne sur les relations diplomatiques
              de 1961, elle est l'instrument principal par lequel le gouvernement bissau-guinéen entretient et
              développe ses relations avec la France, l'un de ses partenaires historiques les plus importants
              sur la scène internationale.
            </p>
            <p>
              La mission première de l'Ambassade est de représenter les intérêts de l'État de Guinée-Bissau
              et de ses ressortissants sur le territoire français. À ce titre, elle est chargée de promouvoir
              les relations bilatérales dans les domaines politique, économique, culturel et scientifique.
              Elle joue également un rôle essentiel dans la négociation d'accords et de conventions entre
              les deux pays, contribuant ainsi au renforcement du cadre juridique qui régit leurs échanges.
              L'Ambassade coordonne par ailleurs l'ensemble des activités consulaires destinées aux citoyens
              bissau-guinéens résidant en France et aux ressortissants étrangers souhaitant se rendre en
              Guinée-Bissau.
            </p>
            <p>
              Sur le plan consulaire, l'Ambassade offre une gamme complète de services aux ressortissants
              bissau-guinéens établis en France : délivrance et renouvellement de passeports, légalisation
              de documents officiels, enregistrement des actes d'état civil, et assistance en cas de
              difficultés à l'étranger. Elle assure également la délivrance de visas aux ressortissants
              étrangers désireux de se rendre en Guinée-Bissau, qu'il s'agisse de visas touristiques,
              d'affaires ou de tout autre type de séjour temporaire.
            </p>
            <p>
              Dans le cadre du renforcement des relations franco-bissau-guinéennes, l'Ambassade œuvre
              activement au développement de partenariats dans des secteurs stratégiques tels que
              l'agriculture, la pêche, les infrastructures et l'éducation. Elle facilite les échanges
              entre universités, institutions culturelles et organisations de la société civile des deux
              pays, contribuant ainsi à une meilleure compréhension mutuelle et à une coopération toujours
              plus fructueuse. La communauté bissau-guinéenne établie en France bénéficie de l'appui
              constant de l'Ambassade dans son intégration et dans le maintien de ses liens avec la mère
              patrie.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
