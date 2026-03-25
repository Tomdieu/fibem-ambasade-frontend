import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { VisaFormWizard } from "@/components/visa/visa-form-wizard";

export const metadata: Metadata = {
  title: "Demande de Visa",
};

export default function VisaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--color-surface-page)">
        <PageHero
          title="Demande de Visa"
          subtitle="Remplissez le formulaire en ligne pour initier votre demande de visa pour la Guinée-Bissau."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services" },
            { label: "Visa" },
          ]}
        />
        <div className="max-w-7xl mx-auto px-(--spacing-container) py-12">
          <VisaFormWizard />
        </div>
      </main>
      <Footer />
    </>
  );
}
