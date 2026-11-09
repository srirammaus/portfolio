import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { hotspots, identity } from "@/data/site";

const LINES = ["Building Practical", "Software Solutions"];

export default function Hero() {

  const reduce = useReducedMotion();

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[68svh] flex-col justify-start px-5 pb-10 pt-[14svh] sm:min-h-[100svh] sm:justify-end sm:pt-28 sm:px-8 lg:px-12"
    >
      {/* interactive points over the 3D scene */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => go(spot.id)}
            style={{ left: spot.left, top: spot.top }}
            className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 p-3"
            aria-label={`${spot.label} — ${spot.hint}`}
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-8 w-8 rounded-full border border-cobalt/25 transition-all duration-500 group-hover:h-10 group-hover:w-10 group-hover:border-cobalt/60" />
              <span className="absolute h-2 w-2 rounded-full bg-cobalt/60 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative h-1 w-1 rounded-full bg-white" />
            </span>
            <span className="pointer-events-none absolute left-8 top-1/2 w-max -translate-y-1/2 border border-line/80 bg-ink/85 px-3 py-2 text-left opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="block type-control text-silver">
                {spot.label}
              </span>
              <span className="mt-1 block type-control text-steel">
                {spot.hint}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] sm:translate-y-0">
        <motion.p {...fade(0.05)} className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{identity.name}</span>
          <span className="h-px w-6 bg-cobalt" />
          <span>{identity.role}</span>
        </motion.p>

        <h1 className="mt-5 max-w-[24ch] sm:mt-7 font-display text-[clamp(1.95rem,5.35vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.045em] text-silver">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: reduce ? 0 : "108%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: reduce ? 0 : 1.15,
                  delay: reduce ? 0 : 0.12 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: reduce ? 0 : "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: reduce ? 0 : 1.15, delay: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              Through <span className="text-[#829cff]">Engineering.</span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:mt-10 sm:gap-8 border-t border-line/70 pt-7 sm:flex-row sm:items-start sm:justify-between">
          <motion.p
            {...fade(0.45)}
            className="max-w-sm text-base leading-relaxed text-steel"
          >
            {identity.tagline}
          </motion.p>

          <motion.div {...fade(0.55)} className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => go("projects")}
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-cobalt px-6 py-3 type-control text-white transition-colors hover:bg-[#1F49E0]"
            >
              Explore My Work
              <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => go("about")}
              className="group inline-flex items-center gap-2 border border-line px-6 py-3 type-control text-silver transition-colors hover:border-silver/40 hover:bg-white/5"
            >
              About Me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
