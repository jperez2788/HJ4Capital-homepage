import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ease-out",
        overlay
          ? "bg-transparent border-b border-transparent"
          : "bg-ink/90 border-b border-hairline-dark backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-8">
        <Link to="/" aria-label={`${SITE.name} home`} className="shrink-0">
          <Logo tone="paper" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-[opacity,color] duration-150 ease-out text-paper/70 hover:text-paper",
                pathname === item.href && "text-paper",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className="text-sm font-medium tracking-wide text-paper/70 transition-[opacity] duration-150 ease-out hover:text-paper"
          >
            {SITE.phone}
          </a>
          <Button asChild variant="primary" size="sm">
            <Link to="/contact">Submit a deal</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "relative inline-flex size-11 items-center justify-center rounded-sm text-paper lg:hidden",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative size-5">
            <Menu
              className={cn(
                "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-200 ease-out",
                open ? "scale-50 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-200 ease-out",
                open ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[4px]",
              )}
            />
          </span>
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out grid",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav
            className={cn(
              "flex flex-col gap-1 border-t border-hairline-dark bg-ink px-5 py-4 sm:px-8",
            )}
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex min-h-11 items-center font-display text-lg text-paper"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="flex min-h-11 items-center font-display text-lg text-paper"
            >
              Submit a deal
            </Link>
            <a
              href={SITE.phoneHref}
              className="flex min-h-11 items-center text-sm text-stone"
            >
              {SITE.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
