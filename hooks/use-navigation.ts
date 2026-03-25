"use client";

import { useMemo } from "react";
import { useI18n } from "@/locales/client";
import type { NavItem } from "@/types";

export function useNavigation() {
  const t = useI18n();

  return useMemo(() => {
    const mainNav: NavItem[] = [
      { label: t("nav.home"), href: "/" },
      {
        label: t("nav.embassy"),
        href: "/ambassade",
        children: [
          { label: t("nav.embassy_presentation"), href: "/ambassade/presentation" },
          { label: t("nav.embassy_ambassador"), href: "/ambassade/ambassadeur" },
          { label: t("nav.embassy_staff"), href: "/ambassade/personnel" },
          { label: t("nav.embassy_history"), href: "/ambassade/histoire" },
        ],
      },
      {
        label: t("nav.services"),
        href: "/services",
        children: [
          { label: t("nav.services_visa"), href: "/services/visa" },
          { label: t("nav.services_passport"), href: "/services/passeport" },
          { label: t("nav.services_legalisation"), href: "/services/legalisation" },
          { label: t("nav.services_civil"), href: "/services/etat-civil" },
          { label: t("nav.services_inscription"), href: "/services/inscription" },
          { label: t("nav.services_appointment"), href: "/services/rendez-vous" },
        ],
      },
      {
        label: t("nav.guinea_bissau"),
        href: "/guinee-bissau",
        children: [
          { label: t("nav.guinea_presentation"), href: "/guinee-bissau/presentation" },
          { label: t("nav.guinea_culture"), href: "/guinee-bissau/culture" },
          { label: t("nav.guinea_economy"), href: "/guinee-bissau/economie" },
          { label: t("nav.guinea_news"), href: "/guinee-bissau/actualites" },
        ],
      },
      { label: t("nav.cooperation"), href: "/cooperation" },
      { label: t("nav.diaspora"), href: "/diaspora" },
      { label: t("nav.contact"), href: "/contact" },
    ];

    return { mainNav };
  }, [t]);
}
