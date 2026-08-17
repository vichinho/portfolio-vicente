const sections = [
  "Sobre mí",
  "Tecnologías",
  "Proyectos",
  "Experiencia",
  "Educación",
  "Contacto",
];

export default function Home() {
  return (
    <main>
      <section className="min-h-screen border-b border-border">
        <div className="portfolio-container flex min-h-screen flex-col justify-center py-24">
          <span className="eyebrow">Portfolio de Vicente Carrasco</span>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Base del proyecto lista para construir una identidad digital limpia y profesional.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Esta rama contiene la foundation visual y técnica. El siguiente paso será construir el Navbar y el Hero definitivo con el Memoji como protagonista.
          </p>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section} className="section-shell border-b border-border last:border-b-0">
          <div className="portfolio-container">
            <span className="eyebrow">Próxima sección</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {section}
            </h2>
          </div>
        </section>
      ))}
    </main>
  );
}
