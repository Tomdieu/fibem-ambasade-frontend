import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-[var(--color-surface-page)] flex items-center justify-center p-4">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
