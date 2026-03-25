import { I18nProviderClient } from "@/locales/client";
import { Toaster } from "@/components/ui/sonner";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <I18nProviderClient locale={locale}>
      {children}
      <Toaster position="top-right" richColors />
    </I18nProviderClient>
  );
}
