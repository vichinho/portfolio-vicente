"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-white/85 backdrop-blur-xl">
      <div className="portfolio-container flex h-18 items-center justify-between gap-6">
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          className="text-xl font-bold tracking-[-0.04em]"
          onClick={closeMenu}
        >
          <span className="text-accent">V</span>C
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <span
            className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-[10px] border border-border bg-white px-4 text-sm font-semibold text-muted opacity-70"
            title="Pendiente de agregar el archivo CV"
          >
            Descargar CV
          </span>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-[10px] border border-border lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0.5 h-px w-5 bg-foreground transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-px w-5 bg-foreground transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3.5 h-px w-5 bg-foreground transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`border-t border-border bg-white lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="portfolio-container flex flex-col py-4" aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-border/70 py-4 text-sm font-medium text-muted last:border-0 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <span
            className="mt-4 inline-flex h-11 cursor-not-allowed items-center justify-center rounded-[10px] bg-accent/55 px-4 text-sm font-semibold text-white"
            title="Pendiente de agregar el archivo CV"
          >
            Descargar CV
          </span>
        </nav>
      </div>
    </header>
  );
}
