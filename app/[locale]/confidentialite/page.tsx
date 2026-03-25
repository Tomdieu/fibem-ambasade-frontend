import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
};

export default async function ConfidentialitePage() {
  const t = await getI18n();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.legal.privacy_policy_title")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.legal.privacy_policy_title") },
          ]}
        />
        <section className="max-w-4xl mx-auto px-[var(--spacing-container)] py-12">
          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.responsible")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Le responsable du traitement des données personnelles collectées via
            ce site est l&apos;Ambassade de Guinée-Bissau en France, 24 Rue de la
            Pompe, 75116 Paris, France. Pour toute question relative au traitement
            de vos données, vous pouvez nous contacter à l&apos;adresse :{" "}
            <a
              href="mailto:contact@ambassade-guinee-bissau.fr"
              className="text-[var(--color-gb-red)] hover:underline"
            >
              contact@ambassade-guinee-bissau.fr
            </a>
            .
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.data_collected")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Dans le cadre de l&apos;utilisation de ce site, nous sommes susceptibles
            de collecter les données personnelles suivantes :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--color-text-muted)] leading-relaxed">
            <li>
              <strong>Formulaires de contact :</strong> nom, prénom, adresse
              e-mail, numéro de téléphone et contenu du message.
            </li>
            <li>
              <strong>Demandes de rendez-vous :</strong> coordonnées, nature de
              la demande et documents joints éventuels.
            </li>
            <li>
              <strong>Cookies :</strong> données de navigation (pages visitées,
              durée de la session, type de navigateur) via des cookies techniques
              et analytiques.
            </li>
          </ul>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.processing_purposes")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Les données collectées sont utilisées aux fins suivantes : répondre à
            vos demandes de contact ou d&apos;information, gérer les rendez-vous
            consulaires, améliorer l&apos;expérience utilisateur du site, assurer la
            sécurité et le bon fonctionnement du site, et respecter nos
            obligations légales.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.data_retention")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Vos données personnelles sont conservées pendant la durée strictement
            nécessaire à l&apos;accomplissement des finalités pour lesquelles elles ont
            été collectées, conformément à la réglementation en vigueur. Les
            données relatives aux demandes consulaires peuvent être conservées
            pour une durée maximale de cinq (5) ans à compter de la clôture du
            dossier.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            {t("pages_content.legal.your_rights")}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-2">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez des droits suivants concernant vos données
            personnelles :
          </p>
          <ul className="list-disc list-inside space-y-1 text-[var(--color-text-muted)] leading-relaxed">
            <li>
              <strong>Droit d&apos;accès :</strong> obtenir une copie des données
              vous concernant.
            </li>
            <li>
              <strong>Droit de rectification :</strong> corriger vos données s&apos;elles
              sont inexactes ou incomplètes.
            </li>
            <li>
              <strong>Droit à l&apos;oubli :</strong> demander la suppression de vos
              données sous certaines conditions.
            </li>
            <li>
              <strong>Droit à la limitation :</strong> restreindre le traitement
              de vos données.
            </li>
            <li>
              <strong>Droit d&apos;opposition :</strong> vous opposer au traitement
              de vos données.
            </li>
          </ul>
          <p className="text-[var(--color-text-muted)] leading-relaxed mt-4">
            Pour exercer l&apos;un de ces droits, veuillez nous contacter à l&apos;adresse
            e-mail susmentionnée.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
