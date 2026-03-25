"use client";

import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const SEARCH_ITEMS = {
  servicesConsulaires: [
    { label: "Demande de visa", href: "/services/visa" },
    { label: "Renouvellement de passeport", href: "/services/passeport" },
    { label: "Légalisation de documents", href: "/services/legalisation" },
    { label: "Acte d'état civil", href: "/services/etat-civil" },
    { label: "Prise de rendez-vous", href: "/services/rendez-vous" },
  ],
  pages: [
    { label: "L'Ambassade — Présentation", href: "/ambassade/presentation" },
    { label: "Mot de l'Ambassadeur", href: "/ambassade/ambassadeur" },
    { label: "Culture & Tourisme", href: "/guinee-bissau/culture" },
    { label: "Coopération", href: "/cooperation" },
  ],
  ressources: [
    { label: "Formulaires en ligne", href: "/services/formulaires" },
    {
      label: "Actualités de la Guinée-Bissau",
      href: "/guinee-bissau/actualites",
    },
  ],
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label="Rechercher"
      >
        <Search className="size-4" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Recherche"
        description="Recherchez une page ou un service consulaire."
      >
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Services Consulaires">
              {SEARCH_ITEMS.servicesConsulaires.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    setOpen(false);
                    window.location.href = item.href;
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pages">
              {SEARCH_ITEMS.pages.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    setOpen(false);
                    window.location.href = item.href;
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Ressources">
              {SEARCH_ITEMS.ressources.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    setOpen(false);
                    window.location.href = item.href;
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
