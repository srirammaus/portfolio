import { Image } from "@/components/ui/image";
import { media } from "@/data/media";
import { identity } from "@/data/site";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import ContactForm from "@/components/site/ContactForm";

const channels = [
  { key: "email", label: "Email", value: identity.email, href: identity.email ? `mailto:${identity.email}` : null },
  { key: "linkedin", label: "LinkedIn", value: identity.linkedin, href: identity.linkedin || null },
  { key: "github", label: "GitHub", value: identity.github, href: identity.github || null },
  { key: "instagram", label: "Instagram", value: identity.instagram, href: identity.instagram || null },
  { key: "youtube", label: "YouTube", value: identity.youtube, href: identity.youtube || null },
  { key: "resume", label: "Resume", value: identity.resume, href: identity.resume || null },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink/60">
      <div className="absolute inset-0">
        <Image src={media.contact} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-20 pt-24 sm:px-8 sm:pt-32 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading index="08" label="Contact" />
            <h2 className="mt-7 max-w-xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-silver">
              Have Something
              <br />
              Interesting to Build?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-steel">
              Business applications, sign-in, payment and SMS integrations, or ERP/API connections —
              tell me what you want to build, which systems you use, and your target timeline.
            </p>

            <Reveal delay={0.08}>
              <dl className="mt-10 border-t border-line/70">
                {channels.map((channel) => (
                  <div
                    key={channel.key}
                    className="flex items-baseline justify-between gap-4 border-b border-line/70 py-3.5"
                  >
                    <dt className="type-meta text-steel">
                      {channel.label}
                    </dt>
                    <dd className="text-right">
                      {channel.href ? (
                        <a
                          href={channel.href}
                          target={channel.key === "email" ? undefined : "_blank"}
                          rel={channel.key === "email" ? undefined : "noreferrer"}
                          className="type-meta text-silver underline-offset-4 transition-colors hover:text-cobalt hover:underline"
                        >
                          {channel.key === "resume"
                            ? "Download"
                            : channel.key === "email"
                              ? channel.value
                              : channel.key === "youtube"
                                ? "Visit channel ↗"
                                : "View profile ↗"}
                        </a>
                      ) : (
                        <span className="type-meta text-steel">
                          Not provided yet
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
