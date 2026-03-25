import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Légalisation" };

export default function LegalisationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Légalisation"
          subtitle="Légalisation et apostille de documents officiels"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Légalisation" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          {/* Alert */}
          <div className="bg-gb-green/10 border-l-4 border-gb-green p-4 rounded-r-card">
            <p className="text-text-body font-medium">
              Pour déposer un dossier de légalisation, prenez d&apos;abord un rendez-vous.
            </p>
            <p className="text-text-muted text-sm mt-1">
              La légalisation authentifie l&apos;origine d&apos;un document officiel afin qu&apos;il soit
              reconnu à l&apos;étranger. Assurez-vous que votre document répond aux critères
              d&apos;éligibilité avant de soumettre votre demande.
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Documents requis */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Documents requis</h2>
              <ul className="space-y-2 text-text-muted list-disc list-inside">
                <li>Document original à légaliser (acte d&apos;état civil, diplôme, jugement, etc.)</li>
                <li>Copie certifiée conforme du document par une autorité compétente</li>
                <li>Pièce d&apos;identité du demandeur en cours de validité</li>
                <li>Formulaire de demande de légalisation dûment complété</li>
                <li>Justificatif démontrant la nécessité de la légalisation (contrat, acte notarié…)</li>
                <li>Traduction certifiée si le document est rédigé dans une langue autre que le français ou le portugais</li>
              </ul>
            </div>

            {/* Délais et tarifs */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Délais et tarifs</h2>
              <div className="border rounded-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Type de document</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Délai</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Acte d&apos;état civil</td>
                      <td className="px-4 py-3 text-text-muted">5 à 10 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">30 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Diplôme ou document académique</td>
                      <td className="px-4 py-3 text-text-muted">7 à 14 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">40 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Document commercial ou juridique</td>
                      <td className="px-4 py-3 text-text-muted">10 à 15 jours ouvrables</td>
                      <td className="px-4 py-3 text-text-muted">50 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Procédure */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Procédure</h2>
              <ol className="space-y-3 list-decimal list-inside text-text-muted">
                <li>Vérifiez que votre document est éligible à la légalisation consulaire (documents issus de Guinée-Bissau ou destinés à y être utilisés).</li>
                <li>Prenez un rendez-vous en ligne via notre plateforme de réservation.</li>
                <li>Préparez votre dossier complet avec tous les documents listés ci-dessus.</li>
                <li>Déposez votre dossier au guichet consulaire lors de votre rendez-vous et acquittez les frais.</li>
                <li>Suivez l&apos;avancement de votre demande grâce au numéro de suivi remis lors du dépôt.</li>
                <li>Récupérez vos documents légalisés sur présentation du récépissé de dépôt.</li>
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
