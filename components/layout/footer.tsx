"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { useFooterLinks } from "@/hooks/use-footer-links";
import { useI18n } from "@/locales/client";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          fill="white"
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
        />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { informations, services, legal } = useFooterLinks();
  const t = useI18n();

  return (
    <footer className="bg-(--color-gb-dark) text-white">
      <div className="mx-auto max-w-7xl px-(--spacing-container) py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                  src="/web-app-manifest-192x192.png"
                  alt="Logo de l'Ambassade de Guinée-Bissau en France"
                  className="flex w-16 h-16 items-center justify-center rounded text-lg font-bold text-white"
                  width={128}
                  height={128}
                />
              <span className="text-sm font-semibold leading-snug">
                Ambassade de Guinée-Bissau en France
              </span>
            </div>

            <p className="mt-2 text-sm text-white/60">
              Représentation officielle de la République de Guinée-Bissau en
              France.
            </p>

            {/* Flag bar */}
            <div className="mt-4 flex gap-0.5">
              <span className="inline-block h-1 w-20 bg-(--color-gb-red)" />
              <span className="inline-block h-1 w-20 bg-(--color-gb-yellow)" />
              <span className="inline-block h-1 w-20 bg-(--color-gb-green)" />
            </div>

            {/* Social icons */}
            <div className="mt-4 flex gap-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2 & 3 — Links from footer links (informations + services) */}
          {(["informations", "services"] as const).map((key) => {
            const section = key === "informations" ? informations : services;
            return (
              <div key={key}>
                <h3 className="mb-3 text-xs uppercase tracking-wider text-white/50">
                  {section.title}
                </h3>
                <ul className="flex flex-col">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm leading-loose text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Column 4 — Contact */}
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-white/40" />
                <span>{t("footer.phone")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-white/40" />
                <span>{t("footer.email")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-white/40" />
                <span>{t("footer.hours")}</span>
              </li>
            </ul>
            <a
              href="https://maps.google.com/?q=24+Rue+de+la+Pompe+75116+Paris"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-(--color-gb-yellow) hover:underline"
            >
              {t("footer.maps_link")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} {t("footer.copyright")}
          </p>
          <ul className="flex flex-wrap gap-4">
            {legal.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
