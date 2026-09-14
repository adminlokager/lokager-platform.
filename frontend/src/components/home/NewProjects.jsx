import { SectionHeader } from "@/components/home/SectionHeader";
import { ProjectCard } from "@/components/home/ProjectCard";
import { Reveal } from "@/components/home/motion";
import { PROJECTS } from "@/data/home";
import { ArrowRight } from "lucide-react";

export const NewProjects = ({ onProject, onExploreAll }) => (
  <section id="projects" data-testid="featured-new-projects-grid" className="bg-ivory-light">
    <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <SectionHeader
        eyebrow="New Projects"
        title="Featured new projects."
        description="Discover fresh launches and upcoming developments from established builders."
        testId="projects-header"
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.08}>
            <ProjectCard project={p} onClick={onProject} testId={`project-card-${p.id}`} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <button
          data-testid="explore-new-projects-button"
          onClick={onExploreAll}
          className="group inline-flex items-center gap-2 rounded-full border border-charcoal px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-ivory"
        >
          Explore New Projects
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </Reveal>
    </div>
  </section>
);
