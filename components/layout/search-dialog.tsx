"use client";

import { useEffect, useState, useMemo } from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
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

const SEARCH_ITEMS_PATHS = {
  servicesConsulaires: [
    { key: "visa", href: "/services/visa" },
    { key: "passport_renewal", href: "/services/passeport" },
    { key: "legalisation", href: "/services/legalisation" },
    { key: "civil_registry", href: "/services/etat-civil" },
    { key: "appointment", href: "/services/rendez-vous" },
  ],
  pages: [
    { key: "embassy_overview", href: "/ambassade/presentation" },
    { key: "ambassador_message", href: "/ambassade/ambassadeur" },
    { key: "culture_tourism", href: "/guinee-bissau/culture" },
    { key: "cooperation", href: "/cooperation" },
  ],
  ressources: [
    { key: "forms", href: "/services/formulaires" },
    { key: "news", href: "/guinee-bissau/actualites" },
  ],
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const t = useI18n();

  const SEARCH_ITEMS = useMemo(() => ({
    servicesConsulaires: SEARCH_ITEMS_PATHS.servicesConsulaires.map(item => {
      const key = `search.${item.key}` as any;
      return {
        // @ts-ignore - next-international dynamic key access
        label: t(key),
        href: item.href,
      };
    }),
    pages: SEARCH_ITEMS_PATHS.pages.map(item => {
      const key = `search.${item.key}` as any;
      return {
        // @ts-ignore - next-international dynamic key access
        label: t(key),
        href: item.href,
      };
    }),
    ressources: SEARCH_ITEMS_PATHS.ressources.map(item => {
      const key = `search.${item.key}` as any;
      return {
        // @ts-ignore - next-international dynamic key access
        label: t(key),
        href: item.href,
      };
    }),
  }), [t]);

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
        aria-label={t("nav.search_placeholder")}
      >
        <Search className="size-4" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={t("nav.search_placeholder")}
        description={t("nav.search_placeholder")}
      >
        <Command>
          <CommandInput placeholder={t("nav.search_placeholder")} />
          <CommandList>
            <CommandEmpty>{t("nav.no_results")}</CommandEmpty>
            <CommandGroup heading={t("search.services_title")}>
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
            <CommandGroup heading={t("search.pages_title")}>
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
            <CommandGroup heading={t("search.resources_title")}>
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
