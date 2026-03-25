import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-page)] flex items-center justify-center p-4">
      <LoginForm />
    </main>
  );
}
