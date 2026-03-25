import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Passeport" };

export default function PasseportPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Passeport"
          subtitle="Demande et renouvellement de passeport bissau-guinéen"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Passeport" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          {/* Alert */}
          <div className="bg-gb-green/10 border-l-4 border-gb-green p-4 rounded-r-card">
            <p className="text-text-body font-medium">
              Pour demander un passeport, prenez d&apos;abord un rendez-vous.
            </p>
            <p className="text-text-muted text-sm mt-1">
              Tout dossier déposé sans rendez-vous préalable ne pourra pas être traité. Veuillez
              utiliser notre système de prise de rendez-vous en ligne.
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Documents requis */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Documents requis</h2>
              <ul className="space-y-2 text-text-muted list-disc list-inside">
                <li>Formulaire de demande de passeport dûment rempli et signé</li>
                <li>Acte de naissance original ou copie certifiée conforme</li>
                <li>Carte nationale d&apos;identité bissau-guinéenne en cours de validité</li>
                <li>Deux photos d&apos;identité récentes aux normes biométriques (fond blanc)</li>
                <li>Ancien passeport (en cas de renouvellement)</li>
                <li>Justificatif de domicile en France datant de moins de trois mois</li>
              </ul>
            </div>

            {/* Délais et tarifs */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Délais et tarifs</h2>
              <div className="border rounded-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Type</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Délai</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">Tarif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Passeport ordinaire (nouveau)</td>
                      <td className="px-4 py-3 text-text-muted">4 à 6 semaines</td>
                      <td className="px-4 py-3 text-text-muted">80 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Renouvellement de passeport</td>
                      <td className="px-4 py-3 text-text-muted">3 à 4 semaines</td>
                      <td className="px-4 py-3 text-text-muted">60 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">Passeport d&apos;urgence</td>
                      <td className="px-4 py-3 text-text-muted">72 heures</td>
                      <td className="px-4 py-3 text-text-muted">120 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Procédure */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">Procédure</h2>
              <ol className="space-y-3 list-decimal list-inside text-text-muted">
                <li>Prenez un rendez-vous en ligne via notre plateforme de réservation.</li>
                <li>Rassemblez l&apos;ensemble des documents requis listés ci-dessus.</li>
                <li>Présentez-vous à l&apos;Ambassade à l&apos;heure de votre rendez-vous avec votre dossier complet.</li>
                <li>Acquittez les frais de traitement par virement bancaire ou en espèces sur place.</li>
                <li>Vous serez informé(e) par email ou par téléphone dès que votre passeport est prêt à être retiré.</li>
                <li>Venez récupérer votre passeport en personne, en présentant le récépissé remis lors du dépôt.</li>
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
