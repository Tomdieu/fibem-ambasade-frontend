import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/ui/page-hero";
import Image from "next/image";

export const metadata: Metadata = { title: "Mot de l'Ambassadeur" };

export default function AmbassadeurPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Mot de l'Ambassadeur"
          subtitle="Message de Son Excellence l'Ambassadeur"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "L'Ambassade", href: "/ambassade" },
            { label: "Mot de l'Ambassadeur" },
          ]}
        />
        <section className="max-w-7xl mx-auto px-container py-12 space-y-8">
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
            {/* Portrait */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-48 h-56 rounded-card overflow-hidden">
                <Image
                  src="/img1.jpg"
                  alt="Portrait de l'Ambassadeur"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <p className="font-medium mt-2 text-text-body">S.E.M. Henrique Adriano Da Silva</p>
              <p className="text-sm text-text-muted">Ambassadeur Extraordinaire</p>
              <p className="text-sm text-text-muted">et Plénipotentiaire</p>
            </div>

            {/* Message */}
            <div className="prose max-w-none space-y-6">
              <p>
                C'est avec un profond sentiment de responsabilité et de fierté que je prends la parole
                en tant qu'Ambassadeur Extraordinaire et Plénipotentiaire de la République de Guinée-Bissau
                en France. Notre pays, riche de sa diversité culturelle et de ses ressources naturelles,
                aspire à renforcer ses liens avec la France, nation partenaire avec laquelle nous partageons
                des valeurs communes de solidarité, de démocratie et de développement humain durable.
              </p>
              <p>
                Depuis ma prise de fonctions, j'ai eu à cœur de faire de cette Ambassade un espace
                d'accueil, d'écoute et de service pour l'ensemble de nos compatriotes résidant en France.
                Qu'il s'agisse d'assistance consulaire, de démarches administratives ou simplement d'un
                besoin d'information, notre équipe reste à votre disposition pour vous accompagner avec
                professionnalisme et bienveillance. L'Ambassade se veut un pont vivant entre la
                Guinée-Bissau et la France, reliant nos deux peuples par des liens durables d'amitié
                et de coopération.
              </p>
              <p>
                Sur le plan diplomatique, mes priorités s'articulent autour du renforcement de la
                coopération bilatérale dans les secteurs de l'éducation, de la santé, de l'agriculture
                et des infrastructures. Je m'engage également à promouvoir l'investissement français
                en Guinée-Bissau, pays qui offre de réelles opportunités économiques pour les entreprises
                souhaitant s'implanter dans une Afrique de l'Ouest en plein essor. La mobilisation de
                la diaspora bissau-guinéenne en France constitue également l'un des axes forts de mon
                action, car nos compatriotes de l'étranger sont de précieux ambassadeurs de notre culture
                et de notre développement.
              </p>
              <p>
                Je vous invite à consulter régulièrement ce site pour vous tenir informés des activités
                de l'Ambassade, des événements culturels que nous organisons et des démarches
                administratives qui vous concernent. N'hésitez pas à nous contacter ; notre équipe
                sera heureuse de répondre à vos questions et de vous accompagner dans vos démarches.
                Ensemble, construisons des ponts solides entre nos deux pays pour un avenir de paix,
                de prospérité et de fraternité.
              </p>
              <p className="font-medium text-text-body not-italic">
                S.E.M. Henrique Adriano Da Silva<br />
                <span className="font-normal text-text-muted text-sm">
                  Ambassadeur Extraordinaire et Plénipotentiaire<br />
                  de la République de Guinée-Bissau en France
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
