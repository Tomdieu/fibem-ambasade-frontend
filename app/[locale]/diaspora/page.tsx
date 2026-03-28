import type { Metadata } from "next";
import Link from "next/link";
import { UserCheck, Banknote, FileText, Plane } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = { title: "Diaspora" };

export default async function DiasporaPage() {
  const t = await getI18n();

  const DIASPORA_SERVICES = [
    {
      icon: <UserCheck className="size-5 text-(--color-gb-blue)" />,
      title: "Inscription consulaire",
      description:
        "L'inscription au registre consulaire vous permet d'être officiellement recensé auprès de l'ambassade. Elle facilite la délivrance de documents officiels, l'assistance en cas de crise et le suivi de vos démarches administratives depuis la France.",
    },
    {
      icon: <Banknote className="size-5 text-(--color-gb-blue)" />,
      title: "Transferts de fonds",
      description:
        "L'ambassade vous informe sur les options sécurisées et à coût réduit pour envoyer de l'argent à vos proches en Guinée-Bissau. Des partenariats avec des opérateurs de transfert agréés permettent des envois rapides et fiables.",
    },
    {
      icon: <FileText className="size-5 text-(--color-gb-blue)" />,
      title: "Actes d'état civil",
      description:
        "L'ambassade peut vous aider à obtenir des extraits de naissance, actes de mariage, casiers judiciaires et autres documents d'état civil auprès des autorités de Guinée-Bissau, en liaison directe avec les services compétents à Bissau.",
    },
    {
      icon: <Plane className="size-5 text-(--color-gb-blue)" />,
      title: "Rapatriement",
      description:
        "En cas de décès d'un ressortissant en France, l'ambassade accompagne les familles dans les démarches de rapatriement du corps en Guinée-Bissau. Une assistance consulaire est disponible pour guider les proches à travers les formalités administratives et funéraires.",
    },
  ];

  const ASSOCIATIONS = [
    "Association des Ressortissants de Guinée-Bissau en France (ARGBF)",
    "Collectif des Femmes Bissau-Guinéennes de France (CFBGF)",
    "Association des Étudiants Bissau-Guinéens en France (AEBGF)",
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.diaspora.title")}
          subtitle={t("pages_content.diaspora.subtitle")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.diaspora.title") },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-10">
          {/* Intro */}
          <p className="text-[var(--color-text-body)] leading-relaxed max-w-3xl">
            {t("pages_content.diaspora.description")}
          </p>

          {/* Services pour la diaspora */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-4">
              {t("pages_content.diaspora.services_title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {DIASPORA_SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-(--color-gb-blue)/10">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-[var(--color-gb-dark)]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Associations */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              {t("pages_content.diaspora.associations_title")}
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed mb-4">
              De nombreuses associations contribuent à la vitalité de la
              communauté bissau-guinéenne en France. Elles organisent des
              événements culturels, soutiennent les nouveaux arrivants dans
              leurs démarches d'installation et maintiennent le lien avec
              le pays d'origine à travers des projets de développement.
              L'ambassade soutient ces initiatives et travaille en
              partenariat avec ces associations pour mieux servir la diaspora.
            </p>
            <ul className="space-y-2">
              {ASSOCIATIONS.map((association) => (
                <li
                  key={association}
                  className="flex items-center gap-2 text-[var(--color-text-body)]"
                >
                  <span className="size-2 shrink-0 rounded-full bg-(--color-gb-blue)" />
                  {association}
                </li>
              ))}
            </ul>
          </div>

          {/* Informations pratiques */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Informations pratiques
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              Pour toute démarche consulaire, il est recommandé de prendre
              rendez-vous en ligne via la plateforme de l'ambassade afin
              d'éviter les délais d'attente. Munissez-vous de vos
              documents d'identité (passeport en cours de validité,
              titre de séjour si applicable) et de tout justificatif
              nécessaire à votre démarche. Les frais consulaires sont
              payables sur place en espèces ou par carte bancaire. En cas
              d'urgence consulaire en dehors des heures d'ouverture,
              un numéro d'astreinte est disponible sur le site de
              l'ambassade.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-(--color-gb-blue) text-white rounded-[var(--radius-card)] p-8">
            <h2 className="text-xl font-semibold mb-2">
              Inscrivez-vous au registre consulaire
            </h2>
            <p className="text-white/80 text-sm mb-6 max-w-lg">
              L'inscription consulaire est gratuite et essentielle pour
              bénéficier de la protection consulaire française lors de vos
              déplacements et pour faciliter vos démarches administratives.
            </p>
            <Link
              href="/services/inscription"
              className="inline-flex items-center justify-center h-9 px-4 bg-white text-(--color-gb-blue) text-sm font-semibold rounded-none hover:bg-white/90 transition-colors"
            >
              S'inscrire maintenant
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
