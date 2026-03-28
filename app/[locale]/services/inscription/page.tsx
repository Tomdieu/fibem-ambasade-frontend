import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Inscription Consulaire" };

export default function InscriptionPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Inscription Consulaire"
          subtitle="Enregistrement sur les registres consulaires"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Inscription" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          {/* Alert */}
          <div className="bg-gb-blue/10 border-l-4 border-gb-blue p-4 rounded-r-card">
            <p className="text-text-body font-medium">
              L&apos;inscription consulaire est fortement recommandée pour tout ressortissant bissau-guinéen résidant en France.
            </p>
            <p className="text-text-muted text-sm mt-1">
              Elle vous permet de bénéficier de la protection de l&apos;Ambassade et d&apos;accéder plus facilement à
              l&apos;ensemble de nos services consulaires. L&apos;inscription est gratuite et valable pour la durée
              de votre séjour en France.
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Avantages */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Avantages de l&apos;inscription</h2>
              <ul className="space-y-2 text-text-muted list-disc list-inside">
                <li>Bénéficier de la protection consulaire en cas d&apos;urgence, de catastrophe naturelle ou de crise</li>
                <li>Recevoir des informations et alertes officielles de l&apos;Ambassade</li>
                <li>Faciliter l&apos;obtention ou le renouvellement de documents d&apos;identité</li>
                <li>Accéder à un traitement prioritaire pour certaines démarches administratives</li>
                <li>Contribuer aux listes électorales consulaires lors des scrutins nationaux</li>
                <li>Être pris en charge en cas de rapatriement ou d&apos;assistance d&apos;urgence</li>
              </ul>
            </div>

            {/* Documents requis */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Documents requis</h2>
              <ul className="space-y-2 text-text-muted list-disc list-inside">
                <li>Passeport bissau-guinéen en cours de validité (original et copie)</li>
                <li>Justificatif de domicile en France datant de moins de trois mois</li>
                <li>Formulaire d&apos;inscription consulaire dûment rempli et signé</li>
                <li>Deux photos d&apos;identité récentes format passeport</li>
                <li>Acte de naissance original ou copie certifiée conforme</li>
                <li>Pour les mineurs : acte de naissance et pièce d&apos;identité du représentant légal</li>
              </ul>
            </div>

            {/* Délais et tarifs */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Délais et tarifs</h2>
              <div className="border rounded-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Prestation</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Délai</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Première inscription</td>
                      <td className="px-4 py-3 text-text-muted">Immédiat</td>
                      <td className="px-4 py-3 text-text-muted">Gratuit</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Renouvellement d&apos;inscription</td>
                      <td className="px-4 py-3 text-text-muted">Immédiat</td>
                      <td className="px-4 py-3 text-text-muted">Gratuit</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Attestation d&apos;inscription</td>
                      <td className="px-4 py-3 text-text-muted">1 à 2 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">10 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Procédure */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Procédure</h2>
              <ol className="space-y-3 list-decimal list-inside text-text-muted">
                <li>Téléchargez et complétez le formulaire d&apos;inscription consulaire disponible sur ce site.</li>
                <li>Rassemblez l&apos;ensemble des documents requis listés ci-dessus.</li>
                <li>Prenez un rendez-vous en ligne via notre plateforme de réservation.</li>
                <li>Présentez-vous au guichet consulaire avec votre dossier complet à la date convenue.</li>
                <li>Votre inscription est enregistrée immédiatement ; une carte ou attestation d&apos;inscription vous est remise.</li>
                <li>Pensez à mettre à jour votre inscription en cas de changement d&apos;adresse ou de situation.</li>
              </ol>
            </div>
          </div>

          {/* CTA */}
          <div>
            <Link
              href="/services/rendez-vous"
              className="inline-block bg-gb-red text-white px-6 py-3 rounded-card font-medium hover:bg-gb-red/90 transition"
            >
              Prendre rendez-vous pour s&apos;inscrire
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
