import type { Metadata } from "next";
import Link from "next/link";
import { getI18n } from "@/locales/server";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Passeport" };

export default async function PasseportPage() {
  const t = await getI18n();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={t("services_page.passport_title")}
          subtitle={t("services_page.passport_subtitle")}
          breadcrumbs={[
            { label: t("common.home"), href: "/" },
            { label: t("nav.services"), href: "/services" },
            { label: t("services_page.passport_title") },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          {/* Alert */}
          <div className="bg-gb-green/10 border-l-4 border-gb-green p-4 rounded-r-card">
            <p className="text-text-body font-medium">
              {t("passport_page.alert_title")}
            </p>
            <p className="text-text-muted text-sm mt-1">
              {t("passport_page.alert_desc")}
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Documents requis */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">{t("common.required_docs")}</h2>
              <ul className="space-y-2 text-text-muted list-disc list-inside">
                <li>{t("passport_page.doc_1")}</li>
                <li>{t("passport_page.doc_2")}</li>
                <li>{t("passport_page.doc_3")}</li>
                <li>{t("passport_page.doc_4")}</li>
                <li>{t("passport_page.doc_5")}</li>
                <li>{t("passport_page.doc_6")}</li>
              </ul>
            </div>

            {/* Délais et tarifs */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">{t("common.delays_fees")}</h2>
              <div className="border rounded-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-surface-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-text-body">{t("passport_page.table_type")}</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">{t("passport_page.table_delay")}</th>
                      <th className="text-left px-4 py-3 font-medium text-text-body">{t("passport_page.table_price")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-text-muted">{t("passport_page.pass_ord")}</td>
                      <td className="px-4 py-3 text-text-muted">{t("passport_page.pass_ord_delay")}</td>
                      <td className="px-4 py-3 text-text-muted">80 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">{t("passport_page.pass_ren")}</td>
                      <td className="px-4 py-3 text-text-muted">{t("passport_page.pass_ren_delay")}</td>
                      <td className="px-4 py-3 text-text-muted">60 €</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-text-muted">{t("passport_page.pass_urg")}</td>
                      <td className="px-4 py-3 text-text-muted">{t("passport_page.pass_urg_delay")}</td>
                      <td className="px-4 py-3 text-text-muted">120 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Procédure */}
            <div>
              <h2 className="text-xl font-semibold text-text-body mb-4">{t("common.procedure")}</h2>
              <ol className="space-y-3 list-decimal list-inside text-text-muted">
                <li>{t("passport_page.proc_1")}</li>
                <li>{t("passport_page.proc_2")}</li>
                <li>{t("passport_page.proc_3")}</li>
                <li>{t("passport_page.proc_4")}</li>
                <li>{t("passport_page.proc_5")}</li>
                <li>{t("passport_page.proc_6")}</li>
              </ol>
            </div>
          </div>

          {/* CTA */}
          <div>
            <Link
              href="/services/rendez-vous"
              className="inline-block bg-gb-red text-white px-6 py-3 rounded-card font-medium hover:bg-gb-red/90 transition"
            >
              {t("common.make_appointment")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
