import { ArrowUp } from "lucide-react";
import { identity, navItems } from "@/data/site";

export default function Footer({ reduced }) {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="relative border-t border-line/70 bg-ink/60">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg tracking-tight text-silver">{identity.name}</p>
            <p className="mt-2 max-w-xs type-meta leading-relaxed tracking-[0.16em] text-steel">
              {identity.role}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="type-meta text-steel transition-colors hover:text-silver"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={toTop}
            className="group inline-flex items-center gap-2 self-start border border-line px-4 py-2.5 type-control text-steel transition-colors hover:border-cobalt/50 hover:text-silver"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-steel">
            © {new Date().getFullYear()} {identity.name}
          </p>
          <p className="type-meta text-steel">
            Built as an interactive portfolio · details editable
          </p>
        </div>
      </div>
    </footer>
  );
}