import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { journalPosts } from "@/data/journal";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import StatusBadge from "@/components/site/StatusBadge";

export default function JournalTeaser() {
  const posts = journalPosts.slice(0, 3);

  return (
    <section id="journal" className="relative bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="07"
            label="Journal"
            title="An engineering journal, in progress."
            intro="Working titles and outlines. Each note is marked as a draft until it is actually written and verified."
            className="flex-1"
          />
          <Link
            to="/journal"
            className="group inline-flex items-center gap-2 border border-line px-5 py-3 type-control text-silver transition-colors hover:border-cobalt/50 hover:text-white"
          >
            All notes
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-line/70 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06} className="bg-ink">
              <Link
                to={`/journal/${post.slug}`}
                className="group flex h-full flex-col justify-between p-6 transition-colors hover:bg-white/[0.02] sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="type-meta text-steel">
                      {post.category}
                    </span>
                    <StatusBadge status={post.status} />
                  </div>
                  <h3 className="mt-5 font-display text-lg leading-snug tracking-tight text-silver transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-steel">{post.excerpt}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 type-meta text-cobalt">
                  Read outline
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}