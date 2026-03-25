import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  FileCheck,
  FileText,
  ScrollText,
  UserPlus,
} from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Services Consulaires" };

const SERVICES = [
  {
    title: "Visa",
    description:
      "Demandez un visa pour la Guinée-Bissau : tourisme, affaires, transit ou séjour longue durée. Remplissez votre dossier en ligne.",
    href: "/services/visa",
    icon: FileText,
  },
  {
    title: "Passeport",
    description:
      "Obtenez ou renouvelez votre passeport bissau-guinéen. Découvrez les pièces requises, les délais et les tarifs en vigueur.",
    href: "/services/passeport",
    icon: BookOpen,
  },
  {
    title: "Légalisation",
    description:
      "Faites légaliser vos documents officiels pour qu'ils soient reconnus en Guinée-Bissau ou en France selon vos besoins.",
    href: "/services/legalisation",
    icon: FileCheck,
  },
  {
    title: "État Civil",
    description:
      "Déclarez une naissance, un mariage ou un décès. Obtenez des copies d'actes d'état civil et effectuez toutes vos démarches.",
    href: "/services/etat-civil",
    icon: ScrollText,
  },
  {
    title: "Inscription Consulaire",
    description:
      "Inscrivez-vous sur les registres consulaires pour bénéficier de la protection de l'Ambassade et faciliter vos démarches.",
    href: "/services/inscription",
    icon: UserPlus,
  },
  {
    title: "Rendez-vous",
    description:
      "Prenez rendez-vous en ligne pour tous vos services consulaires. Choisissez le créneau qui vous convient parmi nos disponibilités.",
    href: "/services/rendez-vous",
    icon: CalendarDays,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Services Consulaires"
          subtitle="Tous nos services à votre disposition"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services Consulaires" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          <div className="prose max-w-none">
            <p className="text-text-muted">
              L'Ambassade de Guinée-Bissau en France met à votre disposition un ensemble complet de
              services consulaires pour vous accompagner dans toutes vos démarches administratives.
              Notre équipe est disponible du lundi au vendredi, de 9h00 à 17h00.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-white border rounded-card p-6 hover:shadow-md transition block"
                >
                  <div className="w-10 h-10 bg-gb-green/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gb-green" />
                  </div>
                  <h2 className="text-lg font-medium text-text-body mb-2">{service.title}</h2>
                  <p className="text-text-muted text-sm mb-4">{service.description}</p>
                  <span className="text-gb-red text-sm font-medium">Accéder →</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
