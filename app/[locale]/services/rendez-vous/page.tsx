import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata: Metadata = {
  title: "Rendez-vous",
};

export default function RendezVousPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--color-surface-page)">
        <PageHero
          title="Prise de rendez-vous"
          subtitle="Réservez un créneau en ligne pour votre visite à l'ambassade."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Services" },
            { label: "Rendez-vous" },
          ]}
        />
        <div className="max-w-7xl mx-auto px-(--spacing-container) py-12">
          <BookingWizard />
        </div>
      </main>
      <Footer />
    </>
  );
}
