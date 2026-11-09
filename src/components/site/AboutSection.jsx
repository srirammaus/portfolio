import { Download } from "lucide-react";
import { about, identity, sectionMeta } from "@/data/site";
import Reveal from "@/components/site/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">
                {sectionMeta.about.index} / {sectionMeta.about.label}
              </p>
              <div className="mt-4 h-px w-10 bg-cobalt" />
            </div>
          </div>

          <div className="lg:col-span-9">
            <Reveal>
              <p className="max-w-3xl font-display text-[clamp(1.35rem,2.4vw,2.05rem)] font-normal leading-[1.35] tracking-[-0.02em] text-silver">
                {about.intro}
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-px bg-line/70 sm:grid-cols-3">
              {about.blocks.map((block, i) => (
                <Reveal key={block.label} delay={i * 0.08} className="bg-ink">
                  <div className="h-full p-6 sm:p-7">
                    <p className="eyebrow">{block.label}</p>
                    <p className="mt-4 text-base leading-relaxed text-steel">{block.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {identity.resume ? (
                  <a
                    href={identity.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-line px-5 py-3 type-control text-silver transition-colors hover:border-cobalt/60 hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download resume
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Add your resume link in the site content file to enable this"
                    className="inline-flex cursor-not-allowed items-center gap-2 border border-line/50 px-5 py-3 type-meta text-steel"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Resume — link pending
                  </span>
                )}
                <p className="type-meta text-steel">
                  Resume and personal details stay editable
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}