import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { journalCategories, journalImage, journalPosts } from "@/data/journal";
import JournalCard from "@/components/journal/JournalCard";
import { identity } from "@/data/site";

export default function Journal() {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    document.title = "Journal — Engineering notes & security research";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        "Draft engineering notes and security research outlines: API security, OAuth, backend engineering and containers."
      );
    }
  }, []);

  const posts = category === "All" ? journalPosts : journalPosts.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-ink/60">
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rotate-45 border border-cobalt/60 transition-transform duration-700 group-hover:rotate-[135deg]" />
              <span className="h-1 w-1 rotate-45 bg-amethyst" />
            </span>
            <span className="type-meta text-silver">
              {identity.name}
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 type-meta text-steel transition-colors hover:text-silver"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 py-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Journal</p>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-silver">
              Engineering notes,
              <br />
              <span className="text-steel">written carefully.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-steel">
              Drafts only. Each entry is an outline for an article or a lab note, published once the
              writing is verified — not before.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[16/9] overflow-hidden border border-line/70">
              <Image
                src={journalImage}
                alt="Macro view of glowing fiber-optic filaments"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line/70 pt-6">
          {journalCategories.map((item) => {
            const isActive = category === item;
            const count =
              item === "All" ? journalPosts.length : journalPosts.filter((p) => p.category === item).length;
            return (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={isActive}
                disabled={count === 0 && item !== "All"}
                className={`border px-3 py-1.5 type-control transition-colors ${
                  isActive
                    ? "border-cobalt/60 bg-cobalt/10 text-white"
                    : "border-line/80 text-steel hover:border-steel/40 hover:text-silver"
                } disabled:cursor-not-allowed disabled:opacity-35`}
              >
                {item}
                <span className="ml-2 text-[8px] text-steel">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}