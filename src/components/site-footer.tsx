import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { DISCLAIMER, FOCUS, NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Logo tone="paper" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone">
            Real estate investment group. Multifamily and income-producing
            properties across Florida, Georgia, the Carolinas, Texas, and select
            Southeast markets.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-6 inline-block font-display text-2xl tracking-tight text-paper transition-[opacity] duration-150 ease-out hover:opacity-70"
          >
            {SITE.phone}
          </a>
          <a
            href={SITE.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-sm text-stone transition-[color] duration-150 ease-out hover:text-paper"
          >
            {SITE.address}
          </a>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-stone">
            Pages
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                to="/"
                className="text-sm text-paper/80 transition-[color] duration-150 ease-out hover:text-paper"
              >
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-paper/80 transition-[color] duration-150 ease-out hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="text-sm text-paper/80 transition-[color] duration-150 ease-out hover:text-paper"
              >
                Submit a deal
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-stone">
            Focus
          </p>
          <ul className="mt-4 space-y-2">
            {FOCUS.map((item) => (
              <li key={item.n} className="text-sm text-paper/80">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline-dark">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <p className="max-w-4xl text-xs leading-relaxed text-muted">{DISCLAIMER}</p>
          <p className="mt-6 text-xs text-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
