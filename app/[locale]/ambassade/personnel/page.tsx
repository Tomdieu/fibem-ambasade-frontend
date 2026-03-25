import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Personnel" };

const STAFF = [
  {
    initials: "SA",
    name: "S.E.M. Seydou Aguiby",
    role: "Ambassadeur",
  },
  {
    initials: "MN",
    name: "Mme Mariama Ndiaye",
    role: "Consul Général",
  },
  {
    initials: "JB",
    name: "M. João Barbosa",
    role: "Attaché Consulaire",
  },
  {
    initials: "FC",
    name: "Mme Fatou Camará",
    role: "Attachée Culturelle",
  },
  {
    initials: "AS",
    name: "M. Amadu Sané",
    role: "Secrétaire d'Ambassade",
  },
  {
    initials: "CM",
    name: "Mme Cláudia Mendes",
    role: "Chargée d'Affaires",
  },
];

export default function PersonnelPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Personnel"
          subtitle="L'équipe diplomatique et consulaire"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "L'Ambassade", href: "/ambassade" },
            { label: "Personnel" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          <div className="prose max-w-none">
            <p className="text-text-muted">
              L'Ambassade de Guinée-Bissau en France est composée d'une équipe de professionnels dévoués,
              engagés au quotidien pour servir les intérêts de la Guinée-Bissau et assister les ressortissants
              bissau-guinéens en France.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAFF.map((member) => (
              <div
                key={member.name}
                className="bg-white border rounded-card p-5 flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gb-green/10 text-gb-green rounded-full flex items-center justify-center text-xl font-medium shrink-0">
                  {member.initials}
                </div>
                <div>
                  <p className="font-medium text-text-body">{member.name}</p>
                  <p className="text-sm text-text-muted">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
