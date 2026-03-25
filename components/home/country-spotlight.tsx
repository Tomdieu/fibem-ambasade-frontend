import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";

export function CountrySpotlight() {
  return (
    <section className="py-section bg-surface-page">
      <div className="max-w-7xl mx-auto px-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: image placeholder */}
          <div className="relative aspect-video rounded-card overflow-hidden bg-gb-green/10 flex items-center justify-center">
            <span className="text-gb-dark/30 text-2xl">
              Guinée-Bissau
            </span>
          </div>

          {/* Right: content */}
          <div>
            <SectionHeading title="Découvrir la Guinée-Bissau" />

            <p className="text-text-muted mt-4 leading-relaxed">
              La Guinée-Bissau est un pays d&apos;Afrique de l&apos;Ouest,
              bordé par le Sénégal au nord, la Guinée au sud et à l&apos;est,
              et l&apos;océan Atlantique à l&apos;ouest. Riche de sa
              biodiversité, de sa culture et de ses traditions ancestrales,
              le pays offre un patrimoine unique à découvrir.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <StatCard value="36 125 km²" label="Superficie" />
              <StatCard value="2,1M" label="Population" />
              <StatCard value="Bissau" label="Capitale" />
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                render={<Link href="/guinee-bissau" />}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
