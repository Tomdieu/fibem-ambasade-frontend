import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/ui/page-hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Contact"
          subtitle="Contactez l'Ambassade de Guinée-Bissau en France"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Contact" },
          ]}
        />

        <div className="max-w-7xl mx-auto px-[var(--spacing-container)] py-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* LEFT — Contact form */}
            <ContactForm />

            {/* RIGHT — Info cards */}
            <aside className="space-y-4">
              {/* Address card */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-[var(--color-gb-dark)]">
                    <MapPin className="size-4 text-[var(--color-gb-red)] shrink-0" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-[var(--color-text-body)]">
                    24 Rue de la Pompe<br />
                    75116 Paris, France
                  </p>
                  <Link
                    href="https://maps.google.com/?q=24+Rue+de+la+Pompe+75116+Paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-gb-red)] hover:underline"
                  >
                    Voir sur Google Maps
                    <ExternalLink className="size-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Opening hours card */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-[var(--color-gb-dark)]">
                    <Clock className="size-4 text-[var(--color-gb-red)] shrink-0" />
                    Horaires d&apos;ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-1.5 text-[var(--color-text-muted)]">Lun – Ven</td>
                        <td className="py-1.5 text-right font-medium text-[var(--color-text-body)]">
                          9h00 – 17h00
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-[var(--color-text-muted)]">Samedi</td>
                        <td className="py-1.5 text-right font-medium text-red-500">
                          Fermé
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-[var(--color-text-muted)]">Dimanche</td>
                        <td className="py-1.5 text-right font-medium text-red-500">
                          Fermé
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Contact details card */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-[var(--color-gb-dark)]">
                    Coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-[var(--color-gb-red)] shrink-0" />
                    <a
                      href="tel:+33145200000"
                      className="text-xs text-[var(--color-text-body)] hover:text-[var(--color-gb-red)] transition-colors"
                    >
                      +33 1 45 20 00 00
                    </a>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-[var(--color-gb-red)] shrink-0" />
                    <a
                      href="mailto:contact@ambassade-guinee-bissau.fr"
                      className="text-xs text-[var(--color-text-body)] hover:text-[var(--color-gb-red)] transition-colors break-all"
                    >
                      contact@ambassade-guinee-bissau.fr
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Social links card */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-[var(--color-gb-dark)]">
                    Suivez-nous
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-badge)] border border-border px-3 py-1.5 text-xs font-medium text-[var(--color-text-body)] hover:border-[var(--color-gb-red)] hover:text-[var(--color-gb-red)] transition-colors"
                      aria-label="Facebook"
                    >
                      <ExternalLink className="size-3" />
                      Facebook
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-badge)] border border-border px-3 py-1.5 text-xs font-medium text-[var(--color-text-body)] hover:border-[var(--color-gb-red)] hover:text-[var(--color-gb-red)] transition-colors"
                      aria-label="Twitter / X"
                    >
                      <ExternalLink className="size-3" />
                      Twitter
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-badge)] border border-border px-3 py-1.5 text-xs font-medium text-[var(--color-text-body)] hover:border-[var(--color-gb-red)] hover:text-[var(--color-gb-red)] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <ExternalLink className="size-3" />
                      LinkedIn
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
