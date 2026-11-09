import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "@/components/site/StatusBadge";

export default function JournalCard({ post }) {
  return (
    <Link
      to={`/journal/${post.slug}`}
      className="group flex h-full flex-col justify-between border border-line/70 bg-surface/30 p-6 transition-colors hover:border-cobalt/40 hover:bg-white/[0.02]"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="type-meta text-steel">
            {post.category}
          </span>
          <StatusBadge status={post.status} />
        </div>
        <h3 className="mt-5 font-display text-xl leading-snug tracking-tight text-silver transition-colors group-hover:text-white">
          {post.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-steel">{post.excerpt}</p>
      </div>

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="border border-line/80 px-2 py-0.5 type-meta text-steel"
            >
              {tag}
            </li>
          ))}
        </ul>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-cobalt" />
      </div>
    </Link>
  );
}