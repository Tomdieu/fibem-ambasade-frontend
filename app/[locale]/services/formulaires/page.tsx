import type { Metadata } from "next";
import { Download, FileText, BookOpen, FileCheck, UserPlus, ScrollText } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Formulaires en ligne" };

const FORMS = [
  {
    title: "Formulaire de demande de visa",
    description: "Téléchargez et remplissez ce formulaire avant votre rendez-vous pour une demande de visa.",
    icon: FileText,
    category: "Visa",
    filename: "formulaire-visa.pdf",
    href: "/services/visa",
  },
  {
    title: "Formulaire de renouvellement de passeport",
    description: "Formulaire requis pour le renouvellement ou la première demande de passeport bissau-guinéen.",
    icon: BookOpen,
    category: "Passeport",
    filename: "formulaire-passeport.pdf",
    href: "/services/passeport",
  },
  {
    title: "Formulaire de légalisation",
    description: "Requis pour la légalisation et l'apostille de documents officiels.",
    icon: FileCheck,
    category: "Légalisation",
    filename: "formulaire-legalisation.pdf",
    href: "/services/legalisation",
  },
  {
    title: "Formulaire d'inscription consulaire",
    description: "Formulaire d'inscription au registre consulaire pour les ressortissants résidant en France.",
    icon: UserPlus,
    category: "Inscription",
    filename: "formulaire-inscription.pdf",
    href: "/services/inscription",
  },
  {
    title: "Déclaration d'état civil",
    description: "Formulaire pour la déclaration de naissance, mariage ou décès auprès du consulat.",
    icon: ScrollText,
    category: "État Civil",
    filename: "formulaire-etat-civil.pdf",
    href: "/services/etat-civil",
  },
];

export default function FormulairesPag() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Formulaires en ligne"
          subtitle="Téléchargez les formulaires nécessaires à vos démarches consulaires"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Formulaires" },
          ]}
        />

        <section className="max-w-7xl mx-auto px-container py-12">
          {/* Notice */}
          <div className="bg-gb-green/10 border-l-4 border-gb-green rounded-r-card p-4 mb-10 text-sm text-gb-dark">
            <strong>Important :</strong> Ces formulaires doivent être imprimés, remplis et signés avant votre
            rendez-vous. Ils ne peuvent pas être soumis en ligne. Prenez{" "}
            <Link href="/services/rendez-vous" className="text-gb-red hover:underline font-medium">
              rendez-vous
            </Link>{" "}
            pour déposer votre dossier.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMS.map((form) => {
              const Icon = form.icon;
              return (
                <div key={form.filename} className="bg-white border rounded-card p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gb-green/10 text-gb-green flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs bg-gb-red/10 text-gb-red px-2 py-0.5 rounded font-medium">
                        {form.category}
                      </span>
                      <h2 className="text-base font-medium text-gb-dark mt-2 leading-snug">
                        {form.title}
                      </h2>
                      <p className="text-sm text-text-muted mt-1 leading-relaxed">
                        {form.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-2 border-t">
                    <button
                      disabled
                      className="flex items-center gap-2 text-sm bg-gb-dark text-white px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                      title="Formulaire bientôt disponible"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger (PDF)
                    </button>
                    <Link href={form.href} className="text-sm text-gb-red hover:underline">
                      En savoir plus →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help section */}
          <div className="mt-12 bg-surface-page border rounded-card p-8 text-center">
            <h2 className="text-xl font-medium text-gb-dark">Besoin d'aide ?</h2>
            <p className="text-text-muted text-sm mt-2 max-w-lg mx-auto">
              Si vous avez des questions sur les formulaires ou la procédure à suivre, n'hésitez pas à
              contacter l'ambassade ou à consulter la page du service concerné.
            </p>
            <div className="flex gap-3 justify-center mt-6 flex-wrap">
              <Link
                href="/contact"
                className="bg-gb-red text-white text-sm px-5 py-2.5 rounded-md hover:bg-gb-red/90 transition"
              >
                Nous contacter
              </Link>
              <Link
                href="/services/rendez-vous"
                className="border border-gb-dark text-gb-dark text-sm px-5 py-2.5 rounded-md hover:bg-gb-dark/5 transition"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
