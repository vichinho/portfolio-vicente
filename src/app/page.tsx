import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

const sections = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "habilidades", label: "Tecnologías" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "educacion", label: "Educación" },
  { id: "contacto", label: "Contacto" },
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {sections.map((section) => (
        <section
          id={section.id}
          key={section.id}
          className="section-shell scroll-mt-24 border-b border-border last:border-b-0"
        >
          <div className="portfolio-container">
            <span className="eyebrow">Próxima sección</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {section.label}
            </h2>
          </div>
        </section>
      ))}
    </main>
  );
}
