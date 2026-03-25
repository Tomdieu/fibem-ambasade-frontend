"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <div className="bg-[var(--color-gb-dark)] py-12 md:py-16 w-full">
      <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <BreadcrumbItem key={index}>
                    {isLast ? (
                      <BreadcrumbPage className="text-white/70">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink
                          render={
                            crumb.href ? (
                              <Link
                                href={crumb.href}
                                className="text-white/70 hover:text-white transition-colors"
                              >
                                {crumb.label}
                              </Link>
                            ) : (
                              <span className="text-white/70">{crumb.label}</span>
                            )
                          }
                        />
                        <BreadcrumbSeparator className="text-white/40" />
                      </>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <div className="border-l-4 border-[var(--color-gb-red)] pl-4">
          <h1 className="text-3xl font-medium text-white">{title}</h1>
          {subtitle && (
            <p className="text-white/70 text-base mt-2">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
