import { MemojiMotion } from "@/components/avatar/MemojiMotion";
import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border pt-18">
      <div className="portfolio-container grid min-h-[calc(100vh-4.5rem)] items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">¡Hola! Soy</p>

          <h1 className="mt-4 text-[clamp(3.25rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.055em] text-foreground">
            Vicente
            <br />
            Carrasco
          </h1>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-foreground/75 sm:text-base">
            {SITE_CONFIG.role}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {SITE_CONFIG.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sobre-mi"
              className="inline-flex h-12 items-center justify-center rounded-[10px] bg-accent px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(108,92,231,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Sobre mí
            </a>
            <a
              href="#contacto"
              className="inline-flex h-12 items-center justify-center rounded-[10px] border border-border bg-white px-6 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40"
            >
              Contáctame
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-sm font-medium text-muted">
            <a
              href="https://github.com/vichinho"
              target="_blank"
              rel="noreferrer"
              className="transition-all hover:-translate-y-0.5 hover:text-accent"
            >
              GitHub
            </a>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span>{SITE_CONFIG.location}</span>
          </div>
        </div>

        <MemojiMotion />
      </div>
    </section>
  );
}
