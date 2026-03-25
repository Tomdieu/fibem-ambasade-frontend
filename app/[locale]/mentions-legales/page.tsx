import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = {
  title: "Mentions Légales",
};

export default async function MentionsLegalesPage() {
  const t = await getI18n();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.legal.legal_notice_title")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.legal.legal_notice_title") },
          ]}
        />
        <section className="max-w-4xl mx-auto px-[var(--spacing-container)] py-12">
          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.editor")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Le présent site est édité par l&apos;Ambassade de Guinée-Bissau en France.
            <br />
            <strong>Adresse :</strong> 24 Rue de la Pompe, 75116 Paris, France
            <br />
            <strong>Téléphone :</strong> +33 1 45 20 00 00
            <br />
            <strong>Email :</strong>{" "}
            <a
              href="mailto:contact@ambassade-guinee-bissau.fr"
              className="text-[var(--color-gb-red)] hover:underline"
            >
              contact@ambassade-guinee-bissau.fr
            </a>
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.hosting")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Ce site est hébergé par un prestataire d&apos;hébergement professionnel
            situé sur le territoire de l&apos;Union européenne. Les informations
            relatives à l&apos;hébergeur sont disponibles sur demande auprès de
            l&apos;ambassade.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.intellectual_property")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes,
            logos, icônes, sons, logiciels, etc.) est la propriété exclusive de
            l&apos;Ambassade de Guinée-Bissau en France ou de ses partenaires. Toute
            reproduction, représentation, modification, publication ou adaptation de
            tout ou partie des éléments du site, quel que soit le moyen ou le
            procédé utilisé, est interdite sans l&apos;autorisation écrite préalable de
            l&apos;ambassade.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.liability")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            L&apos;Ambassade de Guinée-Bissau en France s&apos;efforce d&apos;assurer l&apos;exactitude
            et la mise à jour des informations diffusées sur ce site, dont elle se
            réserve le droit de corriger le contenu à tout moment et sans préavis.
            Toutefois, l&apos;ambassade ne peut garantir l&apos;exactitude, la précision ou
            l&apos;exhaustivité des informations mises à disposition sur ce site et
            décline toute responsabilité pour toute imprécision, inexactitude ou
            omission portant sur des informations disponibles sur ce site.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            Loi applicable
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Les présentes mentions légales sont soumises au droit français. En cas
            de litige et à défaut de résolution amiable, les tribunaux français
            seront seuls compétents. Tout litige relatif à l&apos;utilisation du site
            est soumis à la loi française.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
