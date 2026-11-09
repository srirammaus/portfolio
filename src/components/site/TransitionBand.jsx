import { motion, useReducedMotion } from "framer-motion";
import { systemLayers } from "@/data/site";

export default function TransitionBand() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Connected systems" className="relative">
      <div className="relative h-[150vh]">
        <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden sm:items-center">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 px-5 pt-[10svh] sm:translate-y-0 sm:px-8 sm:pt-0 lg:grid-cols-12 lg:gap-16 lg:px-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Transition — the same environment</p>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.035em] text-silver">
                One environment.
                <br />
                <span className="text-steel">Every layer connected.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-steel">
                Keep scrolling and the core resolves into the systems it represents — services,
                interfaces and the connections between them.
              </p>
            </div>

            <ul className="lg:col-span-7">
              {systemLayers.map((layer, i) => (
                <motion.li
                  key={layer.index}
                  initial={{ opacity: 0, x: reduce ? 0 : -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: reduce ? 0 : 0.7,
                    delay: reduce ? 0 : i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline gap-5 border-t border-line/70 py-3.5 last:border-b sm:gap-8"
                >
                  <span className="type-meta text-cobalt/80">
                    {layer.index}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-base tracking-tight text-silver sm:text-lg">
                    {layer.title}
                  </span>
                  <span className="hidden max-w-[42%] text-right text-xs leading-relaxed text-steel sm:block">
                    {layer.note}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </div>
      </div>
    </section>
  );
}
