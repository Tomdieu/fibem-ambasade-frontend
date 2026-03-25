"use client";

import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { useI18n } from "@/locales/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function RegisterContent() {
  const t = useI18n();

  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto bg-white border rounded-card p-8",
      )}
    >
      {/* Logo placeholder */}
      <div className="flex justify-center">
        <Image
          src="/web-app-manifest-192x192.png"
          alt="Logo de l'Ambassade de Guinée-Bissau en France"
          className="h-10 w-10 rounded object-contain"
          width={40}
          height={40}
        />
      </div>

      {/* Heading */}
      <h1 className="text-xl font-medium text-center mt-4 text-[var(--color-gb-dark)]">
        {t("auth.register_title")}
      </h1>
      <p className="text-sm text-center text-(--color-text-muted) mt-1">
        {t("auth.register_subtitle")}
      </p>

      {/* Notice */}
      <p className="text-sm text-center text-(--color-text-muted) mt-6">
        {t("auth.register_unavailable")}
      </p>

      {/* Info box */}
      <div className="bg-(--color-surface-page) rounded-card p-4 mt-4 text-sm space-y-2">
        <div className="flex items-start gap-2 text-(--color-text-muted)">
          <MapPin className="size-4 text-(--color-gb-red) shrink-0 mt-0.5" />
          <span>{t("footer.address")}</span>
        </div>
        <div className="flex items-center gap-2 text-(--color-text-muted)">
          <Clock className="size-4 text-(--color-gb-red) shrink-0" />
          <span>{t("footer.hours")}</span>
        </div>
        <div className="flex items-center gap-2 text-(--color-text-muted)">
          <Phone className="size-4 text-(--color-gb-red) shrink-0" />
          <a
            href="tel:+33145200000"
            className="hover:text-(--color-gb-red) transition-colors"
          >
            {t("footer.phone")}
          </a>
        </div>
      </div>

      {/* Back to login */}
      <Link
        href="/auth/login"
        className="text-(--color-gb-red) text-sm text-center block mt-4 hover:underline transition-colors"
      >
        {t("auth.already_account")}
      </Link>
    </div>
  );
}
