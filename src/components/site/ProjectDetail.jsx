import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import StatusBadge from "@/components/site/StatusBadge";

export default function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      {project && (
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border border-line bg-ink p-0 text-silver sm:rounded-none">
          <div className="relative">
            {project.image && (
              <div className="relative h-52 w-full overflow-hidden border-b border-line/70 sm:h-64">
                <Image
                  src={project.image}
                  alt={`${project.name} visual`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              </div>
            )}
            <DialogClose className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-line/80 bg-ink/80 text-silver transition-colors hover:border-cobalt/60 hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="type-meta text-steel">
                {project.kind}
              </span>
            </div>

            <DialogTitle className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-medium leading-tight tracking-[-0.03em] text-silver">
              {project.name}
            </DialogTitle>
            <DialogDescription className="mt-2 type-meta text-steel">
              {project.category}
            </DialogDescription>

            <p className="mt-6 text-base leading-relaxed text-steel">{project.description}</p>

            <div className="mt-8">
              <p className="eyebrow">Scope &amp; focus</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.focus.map((item) => (
                  <li
                    key={item}
                    className="border border-line/80 px-3 py-1.5 type-meta text-silver/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-line/70 pt-5">
              <p className="eyebrow">Involvement</p>
              <p className="mt-3 text-base leading-relaxed text-silver/90">{project.involvement}</p>
            </div>

            {project.note && (
              <p className="mt-6 border-l border-cobalt/50 pl-4 type-meta leading-relaxed tracking-[0.08em] text-steel">
                {project.note}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.links?.length ? (
                project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-line px-4 py-2.5 type-control text-silver transition-colors hover:border-cobalt/60 hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))
              ) : (
                <p className="type-meta text-steel">
                  No public demo or repository link is published
                </p>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-line px-4 py-2.5 type-control text-steel transition-colors hover:border-silver/40 hover:text-silver"
              >
                Ask about this work
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}