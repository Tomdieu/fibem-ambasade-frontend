"use client";

import Link from "next/link";

import type { NavItem } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ navItems, isOpen, onClose }: MobileNavProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-75 sm:max-w-75 p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-sm font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="overflow-y-auto px-4 py-2">
          <Accordion className="w-full">
            {navItems.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <AccordionItem key={item.href} value={item.href}>
                    <AccordionTrigger className="py-3 text-sm font-medium">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1 pb-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block rounded px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <div key={item.href} className="border-b last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex w-full items-center py-3 text-sm font-medium transition-colors hover:text-(--color-gb-green)"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
