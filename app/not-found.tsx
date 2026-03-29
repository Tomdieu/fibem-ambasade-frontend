import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <div className="flex-1 flex items-center justify-center bg-surface-page px-container py-section">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-3 h-12 bg-gb-red rounded-full"></div>
                <div className="w-3 h-12 bg-gb-yellow rounded-full"></div>
                <div className="w-3 h-12 bg-gb-green rounded-full"></div>
              </div>
              <h1 className="text-6xl font-bold text-gb-dark mb-4">404</h1>
              <p className="text-2xl font-semibold text-gb-dark mb-4">
                Page non trouvée
              </p>
              <p className="text-lg text-text-muted mb-8 max-w-lg mx-auto">
                La page que vous recherchez n&apos;existe pas ou a été déplacée.
                Veuillez vérifier l&apos;URL ou retourner à l&apos;accueil.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gb-red hover:bg-gb-red/90"
                render={<Link href="/fr" />}
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Retour à l&apos;accueil
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                render={<Link href="/fr/contact" />}
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
