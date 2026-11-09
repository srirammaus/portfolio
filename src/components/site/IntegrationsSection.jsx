import { useState } from "react";
import { Image } from "@/components/ui/image";
import { integrations } from "@/data/integrations";
import { media } from "@/data/media";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function IntegrationsSection() {
  const [selectedId, setSelectedId] = useState(integrations[0].id);
  const selected = integrations.find((item) => item.id === selectedId) || integrations[0];

  return (
    <section id="integrations" className="relative overflow-hidden bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="05"
          label="Connecting Systems"
          title="Integration engineering, visualised as a network."
          intro="Each node is a category of integration work. Select one to see its purpose, the concepts involved and what needs care in production."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="relative aspect-[5/4] w-full overflow-hidden border border-line/70 bg-surface/40 sm:aspect-[16/11]">
              <Image
                src={media.integrations}
                alt="Interwoven glowing threads representing connected systems"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink/70 via-ink/30 to-ink/80" />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {integrations.map((item) => {
                  const isActive = item.id === selected.id;
                  return (
                    <line
                      key={item.id}
                      x1="50"
                      y1="48"
                      x2={parseFloat(item.position.left)}
                      y2={parseFloat(item.position.top)}
                      stroke={isActive ? "#2E5BFF" : "#2A2E3C"}
                      strokeWidth={isActive ? 0.28 : 0.16}
                      strokeDasharray={isActive ? "0" : "1.4 1.4"}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 border border-cobalt/50" />
                  <span className="absolute inset-2 rounded-full bg-cobalt/20 blur-md" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-cobalt" />
                </div>
                <p className="mt-3 whitespace-nowrap text-center type-meta text-steel">
                  Application core
                </p>
              </div>

              {integrations.map((item) => {
                const isActive = item.id === selected.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={isActive}
                    style={{ left: item.position.left, top: item.position.top }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-2 text-left"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rotate-45 border transition-colors ${
                          isActive
                            ? "border-cobalt bg-cobalt"
                            : "border-steel/60 bg-ink group-hover:border-cobalt"
                        }`}
                      />
                      <span
                        className={`whitespace-nowrap border px-2 py-1 type-meta backdrop-blur-sm transition-colors ${
                          isActive
                            ? "border-cobalt/60 bg-ink/90 text-white"
                            : "border-line/80 bg-ink/70 text-steel group-hover:text-silver"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex h-full flex-col border border-line/70 bg-surface/40 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{selected.category}</p>
                  <span className="h-px w-8 bg-cobalt" />
                </div>

                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-silver">
                  {selected.label}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-steel">{selected.purpose}</p>

                <div className="mt-6">
                  <p className="type-meta text-steel">
                    Case-study topics (where implemented)
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {selected.concepts.map((concept) => (
                      <li
                        key={concept}
                        className="border border-line/80 px-2.5 py-1 type-meta text-silver/85"
                      >
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="type-meta text-steel">
                    Engineering considerations
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {selected.considerations.map((consideration) => (
                      <li key={consideration} className="flex gap-3 text-base leading-relaxed text-steel">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-cobalt" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-5 sm:mt-8">
                  <span className="type-meta text-cobalt">
                    {selected.involvement}
                  </span>
                  <span className="type-meta text-steel">
                    No endpoints or credentials published
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
