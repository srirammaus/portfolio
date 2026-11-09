import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPost, journalPosts } from "@/data/journal";
import { identity } from "@/data/site";
import StatusBadge from "@/components/site/StatusBadge";

export default function JournalPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    document.title = post ? `${post.title} — Journal` : "Note not found";
  }, [post]);

  useEffect(() => {
    if (post) return undefined;
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => {
      if (meta.parentNode) meta.parentNode.removeChild(meta);
    };
  }, [post]);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
        <p className="eyebrow">404 — note not found</p>
        <h1 className="mt-6 font-display text-4xl tracking-tight text-silver">
          This note hasn't been written.
        </h1>
        <Link
          to="/journal"
          className="mt-8 inline-flex items-center gap-2 border border-line px-5 py-3 type-control text-silver transition-colors hover:border-cobalt/50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to journal
        </Link>
      </div>
    );
  }

  const related = post.related
    .map((relatedSlug) => journalPosts.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-ink/60">
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rotate-45 border border-cobalt/60" />
              <span className="h-1 w-1 rotate-45 bg-amethyst" />
            </span>
            <span className="type-meta text-silver">
              {identity.name}
            </span>
          </Link>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 type-meta text-steel transition-colors hover:text-silver"
          >
            <ArrowLeft className="h-3 w-3" />
            Journal
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-12">
        <article className="mx-auto max-w-[65ch] py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="type-meta text-cobalt">
              {post.category}
            </span>
            <span className="h-px w-6 bg-line" />
            <StatusBadge status={post.status} />
            <span className="type-meta text-steel">
              {post.date || "Unpublished draft"}
            </span>
            <span className="type-meta text-steel">
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-silver">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-steel">{post.excerpt}</p>

          <div className="mt-9 border-l border-amber-300/40 bg-amber-300/[0.04] px-5 py-4">
            <p className="type-meta text-amber-200/90">
              Draft — outline only
            </p>
            <p className="mt-2 text-base leading-relaxed text-steel">
              This note is not published as finished research. What follows is the working outline;
              nothing here is presented as a confirmed finding.
            </p>
          </div>

          <section className="mt-12">
            <p className="eyebrow">Outline</p>
            <ol className="mt-6 space-y-5">
              {post.outline.map((point, index) => (
                <li key={point} className="flex gap-5 border-t border-line/70 pt-5">
                  <span className="type-meta text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="type-reading text-silver">{point}</p>
                </li>
              ))}
            </ol>
          </section>

          {post.snippet && (
            <section className="mt-12">
              <p className="eyebrow">Code</p>
              <p className="mt-3 type-meta text-steel">
                {post.snippet.label}
              </p>
              <pre className="mt-3 overflow-x-auto border border-line/70 bg-[#07080b] p-5 font-mono text-[12px] leading-relaxed text-silver/90">
                <code>{post.snippet.code}</code>
              </pre>
            </section>
          )}

          <div className="mt-12 flex flex-wrap gap-2 border-t border-line/70 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-line/80 px-2.5 py-1 type-meta text-steel"
              >
                {tag}
              </span>
            ))}
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <p className="eyebrow">Related notes</p>
              <div className="mt-5 border-t border-line/70">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/journal/${item.slug}`}
                    className="group flex items-center justify-between gap-4 border-b border-line/70 py-4"
                  >
                    <span className="font-display text-base tracking-tight text-silver transition-colors group-hover:text-white">
                      {item.title}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-cobalt" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 border border-line/70 p-6">
            <p className="font-display text-lg tracking-tight text-silver">
              Working on something in this area?
            </p>
            <Link
              to="/#contact"
              className="mt-4 inline-flex items-center gap-2 border border-line px-4 py-2.5 type-control text-silver transition-colors hover:border-cobalt/50 hover:text-white"
            >
              Get in touch
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}