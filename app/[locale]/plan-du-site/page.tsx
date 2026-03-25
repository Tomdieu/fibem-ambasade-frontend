import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = {
  title: "Plan du Site",
};

export default async function PlanDuSitePage() {
  const t = await getI18n();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.legal.site_map_title")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.legal.site_map_title") },
          ]}
        />
        <section className="max-w-4xl mx-auto px-[var(--spacing-container)] py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-8">
              {/* L'Ambassade */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  {t("pages_content.ambassade.title")}
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/ambassade/presentation"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Présentation
                  </Link>
                  <Link
                    href="/ambassade/ambassadeur"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Mot de l&apos;Ambassadeur
                  </Link>
                  <Link
                    href="/ambassade/personnel"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Personnel
                  </Link>
                  <Link
                    href="/ambassade/histoire"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Histoire
                  </Link>
                </nav>
              </div>

              {/* Services Consulaires */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  {t("pages_content.services.title")}
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/services/visa"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Visa
                  </Link>
                  <Link
                    href="/services/passeport"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Passeport
                  </Link>
                  <Link
                    href="/services/legalisation"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Légalisation
                  </Link>
                  <Link
                    href="/services/etat-civil"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    État Civil
                  </Link>
                  <Link
                    href="/services/inscription"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Inscription
                  </Link>
                  <Link
                    href="/services/rendez-vous"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Rendez-vous
                  </Link>
                </nav>
              </div>

              {/* Guinée-Bissau */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  {t("pages_content.guinea.title")}
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/guinee-bissau/presentation"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Présentation
                  </Link>
                  <Link
                    href="/guinee-bissau/culture"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Culture &amp; Tourisme
                  </Link>
                  <Link
                    href="/guinee-bissau/economie"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Économie
                  </Link>
                  <Link
                    href="/guinee-bissau/actualites"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Actualités
                  </Link>
                </nav>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              {/* Coopération */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  {t("pages_content.cooperation.title")}
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/cooperation"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Coopération bilatérale
                  </Link>
                </nav>
              </div>

              {/* Diaspora */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  {t("pages_content.diaspora.title")}
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/diaspora"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Communauté en France
                  </Link>
                </nav>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  {t("pages_content.contact.title")}
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/contact"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Nous contacter
                  </Link>
                </nav>
              </div>

              {/* Espace citoyen */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  Espace citoyen
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/citizen/dashboard"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Tableau de bord
                  </Link>
                  <Link
                    href="/citizen/demandes"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Mes demandes
                  </Link>
                  <Link
                    href="/citizen/rendez-vous"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Mes rendez-vous
                  </Link>
                </nav>
              </div>

              {/* Informations légales */}
              <div>
                <h2 className="text-lg font-medium text-[var(--color-gb-dark)] mb-3">
                  Informations légales
                </h2>
                <nav className="flex flex-col">
                  <Link
                    href="/mentions-legales"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Mentions légales
                  </Link>
                  <Link
                    href="/confidentialite"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gb-red)] block py-1 transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
