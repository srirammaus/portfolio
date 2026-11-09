import { useState } from "react";
import { aiDevelopmentTools, skillGroups, skillMatrix, skillsNote } from "@/data/skills";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function SkillsSection() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((group) => group.id === activeId) || skillGroups[0];

  return (
    <section id="skills" className="relative bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="03"
          label="Skills"
          title="Six domains, one engineering practice."
          intro="Grouped by the kind of system being built, rather than a wall of logos."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="border-t border-line/70">
              {skillGroups.map((group) => {
                const isActive = group.id === activeId;
                return (
                  <button
                    key={group.id}
                    onMouseEnter={() => setActiveId(group.id)}
                    onFocus={() => setActiveId(group.id)}
                    onClick={() => setActiveId(group.id)}
                    aria-pressed={isActive}
                    className="group block w-full border-b border-line/70 py-5 text-left"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`type-meta transition-colors ${
                          isActive ? "text-cobalt" : "text-steel"
                        }`}
                      >
                        {group.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-xl tracking-tight transition-colors sm:text-2xl ${
                            isActive ? "text-white" : "text-silver/80"
                          }`}
                        >
                          {group.title}
                        </span>
                        <span className="mt-1 block text-xs text-steel">{group.note}</span>
                      </span>
                      <span
                        className={`h-px w-8 transition-all duration-500 ${
                          isActive ? "w-12 bg-cobalt" : "bg-line group-hover:w-10"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 max-w-md type-meta leading-relaxed tracking-[0.12em] text-steel">
              {skillsNote}
            </p>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative overflow-hidden border border-line/70 bg-surface/50">
                <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">{active.title}</p>
                    <p className="type-meta text-cobalt">
                      {active.index}
                    </p>
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {active.items.map((item) => (
                      <li
                        key={item}
                        className="border border-line/80 bg-ink/60 px-3 py-1.5 type-meta text-silver/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-2">
                    {skillGroups.map((group) => (
                      <span
                        key={group.id}
                        className={`h-px flex-1 transition-colors duration-500 ${
                          group.id === activeId ? "bg-cobalt" : "bg-line"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 type-meta text-steel">
                    {active.items.length} areas of practice
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-line/70 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Experience matrix</p>
              <h3 className="mt-3 font-display text-2xl tracking-tight text-silver">Skills in context</h3>
            </div>
            <p className="type-meta text-steel">Development workflow tools</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {aiDevelopmentTools.map((tool) => (
              <span key={tool} className="border border-cobalt/30 bg-cobalt/5 px-3 py-1.5 type-meta text-silver">{tool}</span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-px bg-line/70 md:grid-cols-2">
            {skillMatrix.map((row) => (
              <article key={row.skill} className="bg-ink p-5 sm:p-6">
                <h4 className="font-display text-lg tracking-tight text-silver">{row.skill}</h4>
                <p className="mt-3 text-sm leading-relaxed text-steel">{row.example}</p>
                <p className="mt-4 type-meta text-cobalt">{row.experience}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
