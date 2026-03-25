"use client";

import { BookOpen, Stamp, UserPlus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";

interface QuickAccessCard {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}

export function HeroSection() {
  const t = useI18n();

  const QUICK_ACCESS_CARDS = useMemo(() => [
    {
      icon: Stamp,
      title: t("home_page.quick_visa_title"),
      description: t("home_page.quick_visa_desc"),
      href: "/services/visa",
    },
    {
      icon: BookOpen,
      title: t("home_page.quick_passport_title"),
      description: t("home_page.quick_passport_desc"),
      href: "/services/passeport",
    },
    {
      icon: UserPlus,
      title: t("home_page.quick_registration_title"),
      description: t("home_page.quick_registration_desc"),
      href: "/services/inscription",
    },
  ], [t]);
  return (
    <section className="min-h-145 bg-gb-green flex flex-col md:flex-row">
      {/* Left */}
      <div className="md:w-[55%] px-8 md:px-20 py-16 flex flex-col justify-center">
        <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full inline-block mb-4 w-fit">
          {t("home_page.official_badge")}
        </span>

        <h1 className="text-4xl md:text-5xl font-medium text-white leading-tight">
          {t("home_page.hero_title")}
        </h1>

        <p className="text-white/80 text-lg mt-4 max-w-md">
          {t("home_page.hero_subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            className="bg-white text-gb-dark hover:bg-gb-green hover:text-white font-medium"
            render={<Link href="/services/visa" />}
          >
            {t("home_page.quick_visa_btn")}
          </Button>
          <Button
            variant="outline"
            className="border-white bg-gb-green text-white hover:bg-white hover:text-black"
            render={<Link href="/services" />}
          >
            {t("home_page.quick_services_btn")}
          </Button>
        </div>
      </div>

      {/* Right */}
      <div className="md:w-[45%] flex items-center justify-center px-8 py-12">
        <div className="flex flex-col gap-3 md:translate-x-6 w-full max-w-sm">
          {QUICK_ACCESS_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white rounded-card border p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-gb-green/10 text-gb-green rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gb-dark">
                    {card.title}
                  </p>
                  <p className="text-xs text-text-muted">
                    {card.description}
                  </p>
                </div>
                <span className="text-gb-red ml-auto shrink-0">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
