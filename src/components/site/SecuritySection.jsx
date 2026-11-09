import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { media } from "@/data/media";
import { labLines, securityAreas, securityFraming } from "@/data/security";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function SecuritySection() {
  return (
    <section id="security" className="relative overflow-hidden bg-ink/60">
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={media.security}
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <SectionHeading
            index="06"
            label="Security Research"
            title="Security Research & Engineering."
            intro="A discipline being studied deliberately — reading, breaking and rebuilding systems inside authorised boundaries."
          />

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="border-t border-line/70">
                {securityAreas.map((area, i) => (
                  <Reveal key={area.index} delay={i * 0.04}>
                    <div className="group flex items-baseline gap-5 border-b border-line/70 py-4">
                      <span className="type-meta text-amethyst/80">
                        {area.index}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-base tracking-tight text-silver sm:text-lg">
                          {area.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-steel">{area.note}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden border border-line/70 bg-[#07080b]">
                <div className="flex items-center justify-between border-b border-line/70 px-4 py-2.5">
                  <span className="type-meta text-steel">
                    research.console
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-300/80" />
                    <span className="type-meta text-steel">
                      authorised
                    </span>
                  </span>
                </div>
                <div className="relative overflow-hidden p-4 sm:p-5">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan bg-gradient-to-b from-amethyst/12 to-transparent" />
                  <dl className="space-y-2.5 type-meta leading-relaxed">
                    {labLines.map((line) => (
                      <div key={line.key} className="flex gap-2">
                        <dt className="w-16 shrink-0 text-steel">{line.key}:</dt>
                        <dd className="text-silver/85">{line.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 border-t border-line/70 pt-4 type-meta leading-relaxed text-steel">
                    &gt; notes are published only as drafts until verified
                    <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-cobalt" />
                  </p>
                </div>
              </div>

              <div className="mt-6 border border-line/70 p-5">
                <p className="eyebrow">Scope &amp; ethics</p>
                <p className="mt-3 text-xs leading-relaxed text-steel">{securityFraming}</p>
              </div>

              <Link
                to="/journal"
                className="group mt-6 flex items-center justify-between border border-line/70 px-5 py-4 transition-colors hover:border-cobalt/50"
              >
                <span>
                  <span className="block font-display text-base tracking-tight text-silver">
                    Read the research journal
                  </span>
                  <span className="mt-1 block type-meta text-steel">
                    Drafts, lab notes and observations
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-cobalt" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
