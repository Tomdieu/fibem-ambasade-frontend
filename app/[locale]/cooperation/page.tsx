import type { Metadata } from "next";
import { DollarSign, BookOpen, GraduationCap, Heart } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { getI18n } from "@/locales/server";

export const metadata: Metadata = { title: "Coopération" };

export default async function CooperationPage() {
  const t = await getI18n();

  const COOPERATION_DOMAINS = [
    {
      icon: <DollarSign className="size-5 text-(--color-gb-blue)" />,
      title: "Coopération économique",
      description:
        "La France soutient le développement économique de la Guinée-Bissau à travers des programmes de renforcement des capacités institutionnelles, de modernisation du secteur privé et de diversification des exportations, notamment dans la filière cajou.",
    },
    {
      icon: <BookOpen className="size-5 text-(--color-gb-blue)" />,
      title: "Coopération culturelle",
      description:
        "Les échanges culturels entre les deux pays se manifestent à travers des festivals, des expositions artistiques et des résidences de création. L'Institut français de Bissau joue un rôle central dans la diffusion de la langue française et la promotion des cultures locales.",
    },
    {
      icon: <GraduationCap className="size-5 text-(--color-gb-blue)" />,
      title: "Coopération éducative",
      description:
        "Des bourses d'études permettent chaque année à des étudiants bissau-guinéens de poursuivre leur formation en France. Des programmes de formation professionnelle et de renforcement du système éducatif national sont également financés dans le cadre de la coopération bilatérale.",
    },
    {
      icon: <Heart className="size-5 text-(--color-gb-blue)" />,
      title: "Aide humanitaire",
      description:
        "En cas de crises sanitaires ou naturelles, la France mobilise une aide humanitaire d'urgence pour la Guinée-Bissau. Des ONG françaises opèrent sur le terrain dans les domaines de la santé maternelle et infantile, de la nutrition et de l'accès à l'eau potable.",
    },
  ];

  const ONGOING_PROJECTS = [
    "Programme d'appui à la réforme du système de santé (PARS) — financement AFD",
    "Projet de développement durable de la filière cajou (PADDEC) — 2024–2027",
    "Renforcement du système éducatif et formation des enseignants — coopération décentralisée",
    "Programme d'électrification rurale par énergie solaire dans les régions de Bafatá et Gabu",
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("pages_content.cooperation.title")}
          subtitle={t("pages_content.cooperation.subtitle")}
          breadcrumbs={[
            { label: t("nav.home"), href: "/" },
            { label: t("pages_content.cooperation.title") },
          ]}
        />
        <section className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12 space-y-10">
          {/* Intro */}
          <p className="text-[var(--color-text-body)] leading-relaxed max-w-3xl">
            La coopération entre la France et la Guinée-Bissau repose sur
            des liens historiques, culturels et humains profonds. Depuis
            l'indépendance de la Guinée-Bissau en 1974, les deux pays
            ont développé une relation de partenariat fondée sur le respect
            mutuel et la solidarité. La France est l'un des principaux
            partenaires au développement de la Guinée-Bissau, intervenant
            dans des domaines variés allant de l'aide budgétaire aux
            projets d'infrastructure, en passant par les échanges
            académiques et culturels.
          </p>

          {/* Domaines de coopération */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-4">
              Domaines de coopération
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {COOPERATION_DOMAINS.map((domain) => (
                <div
                  key={domain.title}
                  className="bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-(--color-gb-blue)/10">
                      {domain.icon}
                    </div>
                    <h3 className="font-semibold text-[var(--color-gb-dark)]">
                      {domain.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Partenariats */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Partenariats
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed">
              Au-delà des relations bilatérales entre les deux gouvernements,
              la coopération franco-bissau-guinéenne implique un large
              écosystème d'acteurs : collectivités territoriales
              françaises engagées dans des jumelages, universités et grandes
              écoles accueillant des étudiants bissau-guinéens, entreprises
              françaises investissant dans des secteurs porteurs, et
              organisations de la société civile menant des projets de
              terrain. La coopération décentralisée entre des villes
              françaises et des communes de Guinée-Bissau contribue à
              développer des liens durables et à renforcer la gouvernance
              locale.
            </p>
          </div>

          {/* Projets en cours */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-gb-dark)] mb-3">
              Projets en cours
            </h2>
            <ul className="space-y-2">
              {ONGOING_PROJECTS.map((project) => (
                <li
                  key={project}
                  className="flex items-start gap-2 text-[var(--color-text-body)]"
                >
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-(--color-gb-blue)" />
                  {project}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
