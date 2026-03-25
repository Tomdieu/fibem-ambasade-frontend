import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Politique de Confidentialité"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Politique de confidentialité" },
          ]}
        />
        <section className="max-w-4xl mx-auto px-[var(--spacing-container)] py-12">
          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            Responsable du traitement
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
            Données collectées
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
            Finalités du traitement
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Les données collectées sont utilisées aux fins suivantes : répondre à
            vos demandes de contact ou d&apos;information, gérer les rendez-vous
            consulaires, améliorer l&apos;expérience utilisateur du site, assurer la
            sécurité et le bon fonctionnement du site, et respecter nos
            obligations légales.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            Conservation des données
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
            Vos droits (RGPD)
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
              <strong>Droit de rectification :</strong> corriger des données
              inexactes ou incomplètes.
            </li>
            <li>
              <strong>Droit à l&apos;effacement :</strong> demander la suppression de
              vos données dans les cas prévus par la loi.
            </li>
            <li>
              <strong>Droit à la portabilité :</strong> recevoir vos données dans
              un format structuré et lisible par machine.
            </li>
            <li>
              <strong>Droit d&apos;opposition :</strong> vous opposer au traitement de
              vos données pour des motifs légitimes.
            </li>
          </ul>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            Cookies
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Ce site utilise des cookies techniques indispensables à son
            fonctionnement et des cookies analytiques pour mesurer l&apos;audience.
            Vous pouvez configurer votre navigateur pour refuser les cookies, ce
            qui peut toutefois affecter certaines fonctionnalités du site. Les
            cookies ne sont pas utilisés à des fins publicitaires.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-3 text-[var(--color-gb-dark)]">
            Contact DPO
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Pour exercer vos droits ou pour toute question relative à la
            protection de vos données personnelles, vous pouvez contacter notre
            délégué à la protection des données (DPO) à l&apos;adresse suivante :{" "}
            <a
              href="mailto:dpo@ambassade-guinee-bissau.fr"
              className="text-[var(--color-gb-red)] hover:underline"
            >
              dpo@ambassade-guinee-bissau.fr
            </a>
            . Vous avez également le droit d&apos;introduire une réclamation auprès
            de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
