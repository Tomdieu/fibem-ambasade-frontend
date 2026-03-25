import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RegisterContent } from "@/components/auth/register-content";

export const metadata: Metadata = {
  title: "Créer un compte",
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-(--color-surface-page) flex items-center justify-center p-4">
        <RegisterContent />
      </main>
      <Footer />
    </>
  );
}
