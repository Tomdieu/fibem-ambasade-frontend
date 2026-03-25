"use client";

import { useMemo } from "react";
import { useI18n } from "@/locales/client";

export function useFooterLinks() {
  const t = useI18n();

  return useMemo(() => {
    const informations = {
      title: t("footer.informations_title"),
      links: [
        { label: t("footer.about"), href: "/ambassade/presentation" },
        { label: t("footer.news"), href: "/guinee-bissau/actualites" },
        { label: t("footer.cooperation"), href: "/cooperation" },
        { label: t("footer.diaspora"), href: "/diaspora" },
      ],
    };

    const services = {
      title: t("footer.services_title"),
      links: [
        { label: t("footer.visa"), href: "/services/visa" },
        { label: t("footer.passport"), href: "/services/passeport" },
        { label: t("footer.legalisation"), href: "/services/legalisation" },
        { label: t("footer.appointment"), href: "/services/rendez-vous" },
      ],
    };

    const legal = {
      title: t("footer.legal_title"),
      links: [
        { label: t("footer.legal"), href: "/mentions-legales" },
        { label: t("footer.privacy"), href: "/confidentialite" },
        { label: t("footer.sitemap"), href: "/plan-du-site" },
      ],
    };

    return { informations, services, legal };
  }, [t]);
}
