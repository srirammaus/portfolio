import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { personalProjects, professionalProjects } from "@/data/projects";
import SectionHeading from "@/components/site/SectionHeading";
import StatusBadge from "@/components/site/StatusBadge";
import ProjectDetail from "@/components/site/ProjectDetail";
import Reveal from "@/components/site/Reveal";

export default function ProjectsSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="relative bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="04"
          label="Projects"
          title="Personal experiments first, professional delivery second."
          intro="Two tracks, kept clearly apart: what I build for myself, and the products I work on with a team."
        />

        <div className="mt-16 space-y-6">
          {personalProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <button
                onClick={() => setActive(project)}
                className="group block w-full border border-line/70 bg-surface/20 p-6 text-left transition-colors hover:border-cobalt/40 hover:bg-surface/35 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4">
                  <StatusBadge status={project.status} />
                  <span className="type-meta text-silver/70">{project.kind}</span>
                </div>
                <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)] lg:items-center lg:gap-12">
                  <div>
                  <p className="eyebrow">{project.category}</p>
                  <h3 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-tight tracking-[-0.035em] text-silver">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-steel">
                    {project.summary}
                  </p>
                  </div>
                  <div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.focus.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="border border-line/80 px-2.5 py-1 type-meta text-silver/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex items-center gap-2 type-meta text-cobalt">
                    View project
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected professional experience</p>
              <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium tracking-[-0.03em] text-silver">
                Company-context projects
              </h3>
            </div>
            <p className="max-w-sm type-meta leading-relaxed tracking-[0.1em] text-steel">
              Descriptions are deliberately generic. Client names, metrics and internal details
              are not published.
            </p>
          </div>

          <div className="mt-8 border-t border-line/70">
            {professionalProjects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setActive(project)}
                className="group grid w-full grid-cols-12 items-center gap-3 border-b border-line/70 py-5 text-left transition-colors hover:bg-white/[0.02] sm:gap-4 sm:px-2"
              >
                <span className="col-span-2 type-meta text-steel sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-7 min-w-0 sm:col-span-4">
                  <span className="block truncate font-display text-lg tracking-tight text-silver transition-colors group-hover:text-white sm:text-xl">
                    {project.name}
                  </span>
                  <span className="mt-1 block truncate type-meta text-steel sm:hidden">
                    {project.category}
                  </span>
                </span>
                <span className="hidden type-meta text-steel sm:col-span-3 sm:block">
                  {project.category}
                </span>
                <span className="col-span-3 flex justify-end sm:col-span-3">
                  <StatusBadge status={project.status} />
                </span>
                <ArrowUpRight className="ml-auto hidden h-4 w-4 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-cobalt sm:col-span-1 sm:block" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  );
}
