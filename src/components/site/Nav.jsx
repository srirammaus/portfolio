import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Menu, Waves, X } from "lucide-react";
import { identity, navItems } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Nav({ reduced, onToggleReduced, sceneOn, onToggleScene }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return undefined;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || open ? "border-b border-line/80 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="type-control text-silver" aria-label="Home">
            {identity.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const isActive = onHome && active === item.id;
              return onHome ? (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative py-1 type-control transition-colors",
                    isActive ? "text-silver" : "text-steel hover:text-silver"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-cobalt transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  className="type-control text-steel transition-colors hover:text-silver"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleReduced}
              aria-pressed={reduced}
              title={reduced ? "Motion reduced — click for full motion" : "Reduce motion"}
              className="flex h-9 w-9 items-center justify-center border border-line/70 text-steel transition-colors hover:border-cobalt/60 hover:text-silver"
            >
              <Waves className="h-3.5 w-3.5" />
              <span className="sr-only">Toggle reduced motion</span>
            </button>
            <button
              onClick={onToggleScene}
              aria-pressed={sceneOn}
              title={sceneOn ? "Exit immersive 3D scene" : "Enter immersive 3D scene"}
              className="flex h-9 w-9 items-center justify-center border border-line/70 text-steel transition-colors hover:border-cobalt/60 hover:text-silver"
            >
              <Box className="h-3.5 w-3.5" />
              <span className="sr-only">
                {sceneOn ? "Exit immersive 3D scene" : "Enter immersive 3D scene"}
              </span>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="ml-1 flex h-9 w-9 items-center justify-center border border-line/70 text-silver lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-ink/97 px-6 pt-24 backdrop-blur-xl lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={onHome ? "#" : `/#${item.id}`}
                onClick={(event) => {
                  if (onHome) {
                    event.preventDefault();
                    go(item.id);
                  } else {
                    setOpen(false);
                  }
                }}
                className="hairline-b flex items-baseline justify-between py-4 font-display text-2xl tracking-tight text-silver"
              >
                {item.label}
                <span className="type-control text-steel">
                  {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
          <p className="mt-8 max-w-xs text-base leading-relaxed text-steel">
            {identity.role}
          </p>
        </div>
      )}
    </>
  );
}
