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

        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center lg:justify-end">
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(108,92,231,0.16),rgba(108,92,231,0.05)_45%,transparent_72%)] blur-2xl" />
          <div className="relative aspect-square w-full max-w-[430px] rounded-[32px] border border-border bg-gradient-to-b from-white to-secondary-bg p-5 shadow-[0_18px_60px_rgba(17,19,24,0.06)]">
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[24px] border border-white bg-[radial-gradient(circle_at_50%_45%,rgba(108,92,231,0.12),transparent_55%)]">
              <div className="absolute left-[14%] top-[20%] size-2 rounded-full bg-accent/25" />
              <div className="absolute right-[15%] top-[30%] size-3 rounded-full bg-accent/15" />
              <div className="absolute bottom-[18%] left-[22%] size-1.5 rounded-full bg-accent/30" />

              <div className="flex size-44 items-center justify-center rounded-full border border-accent/15 bg-white/85 text-center shadow-[0_12px_40px_rgba(108,92,231,0.12)] sm:size-52">
                <div>
                  <span className="block text-5xl font-bold tracking-[-0.06em] text-foreground sm:text-6xl">
                    <span className="text-accent">V</span>C
                  </span>
                  <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    Memoji aquí
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
