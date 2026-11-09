import { ArrowUpRight } from "lucide-react";
import { freelanceServices } from "@/data/services";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="02"
          label="Freelance Services"
          title="Practical software work for connected businesses."
          intro="I can help build business applications and connect them to the services and systems your team already uses."
        />

        <div className="mt-14 grid grid-cols-1 gap-px bg-line/70 sm:grid-cols-2">
          {freelanceServices.map((service, i) => (
            <Reveal key={service.index} delay={i * 0.05} className="bg-ink">
              <article className="group h-full p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="type-meta text-cobalt">{service.index}</span>
                  <ArrowUpRight className="h-4 w-4 text-steel transition-colors group-hover:text-cobalt" />
                </div>
                <h3 className="mt-8 font-display text-2xl tracking-tight text-silver">{service.title}</h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-steel">{service.description}</p>
                <p className="mt-7 border-t border-line/70 pt-4 type-meta leading-relaxed text-silver/80">{service.examples}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-2xl type-meta leading-relaxed text-steel">
          Project scope and delivery details are agreed after understanding your requirements, existing systems, and timeline.
        </p>
      </div>
    </section>
  );
}
