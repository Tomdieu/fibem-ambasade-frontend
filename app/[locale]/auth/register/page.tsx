import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Créer un compte",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-page)] flex items-center justify-center p-4">
      <div className="bg-white border rounded-[var(--radius-card)] p-8 max-w-sm w-full mx-auto">
        {/* Logo placeholder */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-gb-green)] text-white flex items-center justify-center font-bold text-lg">
            GB
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-medium text-center mt-4 text-[var(--color-gb-dark)]">
          Créer un compte citoyen
        </h1>
        <p className="text-sm text-center text-[var(--color-text-muted)] mt-1">
          Accédez aux services consulaires en ligne
        </p>

        {/* Notice */}
        <p className="text-sm text-center text-[var(--color-text-muted)] mt-6">
          L&apos;inscription en ligne n&apos;est pas encore disponible.
          Veuillez vous présenter à l&apos;ambassade avec vos documents d&apos;identité.
        </p>

        {/* Info box */}
        <div className="bg-[var(--color-surface-page)] rounded-[var(--radius-card)] p-4 mt-4 text-sm space-y-2">
          <div className="flex items-start gap-2 text-[var(--color-text-muted)]">
            <MapPin className="size-4 text-[var(--color-gb-red)] shrink-0 mt-0.5" />
            <span>24 Rue de la Pompe, 75116 Paris, France</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <Clock className="size-4 text-[var(--color-gb-red)] shrink-0" />
            <span>Lun – Ven : 9h00 – 17h00</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <Phone className="size-4 text-[var(--color-gb-red)] shrink-0" />
            <a
              href="tel:+33145200000"
              className="hover:text-[var(--color-gb-red)] transition-colors"
            >
              +33 1 45 20 00 00
            </a>
          </div>
        </div>

        {/* Back to login */}
        <Link
          href="/auth/login"
          className="text-[var(--color-gb-red)] text-sm text-center block mt-4 hover:underline transition-colors"
        >
          Vous avez déjà un compte ? Se connecter
        </Link>
      </div>
    </main>
  );
}
