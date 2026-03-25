"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { useI18n } from "@/locales/client";

export function CountrySpotlight() {
  const t = useI18n();
  return (
    <section className="py-section bg-surface-page">
      <div className="max-w-7xl mx-auto px-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: image */}
          <div className="relative aspect-video rounded-card overflow-hidden">
            <Image
              src="/guinee-bissau.png"
              alt="Guinée-Bissau"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: content */}
          <div>
            <SectionHeading title={t("home_page.country_title")} />

            <p className="text-text-muted mt-4 leading-relaxed">
              {t("home_page.country_description")}
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <StatCard value={t("home_page.stat_area_value")} label={t("home_page.stat_area")} />
              <StatCard value={t("home_page.stat_population_value")} label={t("home_page.stat_population")} />
              <StatCard value={t("home_page.stat_capital_value")} label={t("home_page.stat_capital")} />
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                render={<Link href="/guinee-bissau" />}
              >
                {t("home_page.learn_more_btn")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
