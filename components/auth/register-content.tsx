"use client";

import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { useI18n } from "@/locales/client";
import { cn } from "@/lib/utils";

export function RegisterContent() {
  const t = useI18n();

  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto bg-white border rounded-[var(--radius-card)] p-8"
      )}
    >
      {/* Logo placeholder */}
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-lg bg-[var(--color-gb-green)] text-white flex items-center justify-center font-bold text-lg">
          GB
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-medium text-center mt-4 text-[var(--color-gb-dark)]">
        {t("auth.register_title")}
      </h1>
      <p className="text-sm text-center text-[var(--color-text-muted)] mt-1">
        {t("auth.register_subtitle")}
      </p>

      {/* Notice */}
      <p className="text-sm text-center text-[var(--color-text-muted)] mt-6">
        {t("auth.register_unavailable")}
      </p>

      {/* Info box */}
      <div className="bg-[var(--color-surface-page)] rounded-[var(--radius-card)] p-4 mt-4 text-sm space-y-2">
        <div className="flex items-start gap-2 text-[var(--color-text-muted)]">
          <MapPin className="size-4 text-[var(--color-gb-red)] shrink-0 mt-0.5" />
          <span>{t("footer.address")}</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
          <Clock className="size-4 text-[var(--color-gb-red)] shrink-0" />
          <span>{t("footer.hours")}</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
          <Phone className="size-4 text-[var(--color-gb-red)] shrink-0" />
          <a
            href="tel:+33145200000"
            className="hover:text-[var(--color-gb-red)] transition-colors"
          >
            {t("footer.phone")}
          </a>
        </div>
      </div>

      {/* Back to login */}
      <Link
        href="/auth/login"
        className="text-[var(--color-gb-red)] text-sm text-center block mt-4 hover:underline transition-colors"
      >
        {t("auth.already_account")}
      </Link>
    </div>
  );
}
