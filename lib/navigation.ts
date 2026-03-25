import type { NavItem } from "@/types";

export const MAIN_NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "L'Ambassade",
    href: "/ambassade",
    children: [
      { label: "Présentation", href: "/ambassade/presentation" },
      { label: "Mot de l'Ambassadeur", href: "/ambassade/ambassadeur" },
      { label: "Personnel", href: "/ambassade/personnel" },
      { label: "Histoire", href: "/ambassade/histoire" },
    ],
  },
  {
    label: "Services Consulaires",
    href: "/services",
    children: [
      { label: "Visa", href: "/services/visa" },
      { label: "Passeport", href: "/services/passeport" },
      { label: "Légalisation", href: "/services/legalisation" },
      { label: "État Civil", href: "/services/etat-civil" },
      { label: "Inscription", href: "/services/inscription" },
      { label: "Rendez-vous", href: "/services/rendez-vous" },
    ],
  },
  {
    label: "Guinée-Bissau",
    href: "/guinee-bissau",
    children: [
      { label: "Présentation", href: "/guinee-bissau/presentation" },
      { label: "Culture & Tourisme", href: "/guinee-bissau/culture" },
      { label: "Économie", href: "/guinee-bissau/economie" },
      { label: "Actualités", href: "/guinee-bissau/actualites" },
    ],
  },
  { label: "Coopération", href: "/cooperation" },
  { label: "Diaspora", href: "/diaspora" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: Record<
  string,
  { title: string; links: { label: string; href: string }[] }
> = {
  informations: {
    title: "Informations",
    links: [
      { label: "À propos", href: "/ambassade/presentation" },
      { label: "Actualités", href: "/guinee-bissau/actualites" },
      { label: "Coopération", href: "/cooperation" },
      { label: "Diaspora", href: "/diaspora" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { label: "Visa", href: "/services/visa" },
      { label: "Passeport", href: "/services/passeport" },
      { label: "Légalisation", href: "/services/legalisation" },
      { label: "Rendez-vous", href: "/services/rendez-vous" },
    ],
  },
  legal: {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Plan du site", href: "/plan-du-site" },
    ],
  },
};
