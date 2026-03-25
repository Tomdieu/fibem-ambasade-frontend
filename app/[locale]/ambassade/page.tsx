import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = { title: "L'Ambassade" };

export default async function AmbassadePage() {
  const t = await getI18n();

  const SUBPAGES = [
    {
      title: "Présentation",
      description:
        "Découvrez la mission, le rôle et les attributions de l'Ambassade de Guinée-Bissau en France, ainsi que son engagement dans le renforcement des relations bilatérales.",
      href: "/ambassade/presentation",
    },
    {
      title: "Mot de l'Ambassadeur",
      description:
        "Lisez le message personnel de Son Excellence l'Ambassadeur, ses priorités diplomatiques et sa vision pour les relations franco-bissau-guinéennes.",
      href: "/ambassade/ambassadeur",
    },
    {
      title: "Personnel",
      description:
        "Faites connaissance avec l'équipe diplomatique et consulaire qui assure au quotidien le bon fonctionnement de la représentation officielle.",
      href: "/ambassade/personnel",
    },
    {
      title: "Histoire",
      description:
        "Retracez l'histoire des relations diplomatiques entre la Guinée-Bissau et la France, des origines à nos jours, à travers les grandes étapes de ce partenariat.",
      href: "/ambassade/histoire",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.ambassade.title")}
          subtitle={t("pages_content.ambassade.subtitle")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.ambassade.title") },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          <div className="prose max-w-none">
            <p className="text-text-muted text-lg">
              {t("pages_content.ambassade.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUBPAGES.map((page) => (
              <div
                key={page.href}
                className="bg-white border rounded-card p-6 hover:shadow-md transition"
              >
                <h2 className="text-lg font-medium text-text-body mb-2">
                  {page.title}
                </h2>
                <p className="text-text-muted text-sm mb-4">{page.description}</p>
                <Link
                  href={page.href}
                  className="text-gb-red text-sm font-medium hover:underline"
                >
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
