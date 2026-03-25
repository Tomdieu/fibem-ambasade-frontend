import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "État Civil" };

export default function EtatCivilPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="État Civil"
          subtitle="Déclarations et actes d'état civil"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "État Civil" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          {/* Alert */}
          <div className="bg-gb-green/10 border-l-4 border-gb-green p-4 rounded-r-card">
            <p className="text-text-body font-medium">
              Toute démarche d&apos;état civil requiert un rendez-vous préalable.
            </p>
            <p className="text-text-muted text-sm mt-1">
              L&apos;état civil regroupe l&apos;ensemble des actes qui constatent les faits juridiques
              relatifs aux personnes : naissance, mariage, décès. L&apos;Ambassade est compétente pour
              enregistrer ces événements survenus en France concernant des ressortissants bissau-guinéens.
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Documents requis */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Documents requis</h2>
              <ul className="space-y-2 text-text-muted list-disc list-inside">
                <li>Acte d&apos;état civil français original (acte de naissance, acte de mariage ou acte de décès)</li>
                <li>Traduction certifiée de l&apos;acte en portugais par un traducteur assermenté</li>
                <li>Pièces d&apos;identité des personnes concernées (parents, époux ou déclarant)</li>
                <li>Livret de famille (si disponible)</li>
                <li>Formulaire de déclaration consulaire dûment rempli</li>
                <li>Tout document supplémentaire selon la nature de l&apos;acte (certificat médical de naissance, contrat de mariage, etc.)</li>
              </ul>
            </div>

            {/* Délais et tarifs */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Délais et tarifs</h2>
              <div className="border rounded-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Type d&apos;acte</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Délai</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Déclaration de naissance</td>
                      <td className="px-4 py-3 text-text-muted">5 à 7 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">Gratuit</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Transcription de mariage</td>
                      <td className="px-4 py-3 text-text-muted">7 à 14 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">35 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Déclaration de décès</td>
                      <td className="px-4 py-3 text-text-muted">5 à 10 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">Gratuit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Procédure */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Procédure</h2>
              <ol className="space-y-3 list-decimal list-inside text-text-muted">
                <li>Munissez-vous de l&apos;acte d&apos;état civil français correspondant à l&apos;événement à déclarer.</li>
                <li>Faites traduire l&apos;acte en portugais par un traducteur assermenté si nécessaire.</li>
                <li>Prenez un rendez-vous en ligne auprès du service consulaire de l&apos;Ambassade.</li>
                <li>Déposez votre dossier complet au guichet lors de votre rendez-vous.</li>
                <li>L&apos;Ambassade transmet la déclaration aux autorités bissau-guinéennes compétentes.</li>
                <li>Un extrait d&apos;acte consulaire vous est remis ou expédié une fois l&apos;enregistrement confirmé.</li>
              </ol>
            </div>
          </div>

          {/* CTA */}
          <div>
            <Link
              href="/services/rendez-vous"
              className="inline-block bg-gb-red text-white px-6 py-3 rounded-card font-medium hover:bg-gb-red/90 transition"
            >
              Prendre un rendez-vous
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
