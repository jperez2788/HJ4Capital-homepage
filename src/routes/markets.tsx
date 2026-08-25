import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MarketExplorer } from "@/components/market-explorer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { MARKETS, SITE } from "@/lib/site";

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
  head: () => ({
    meta: [
      { title: `Markets — ${SITE.name}` },
      {
        name: "description",
        content:
          "HJ4 Capital evaluates multifamily and income-producing real estate across Florida, Georgia, the Carolinas, Texas, Tennessee, Alabama, and select Sun Belt markets.",
      },
    ],
  }),
});

function MarketsPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Markets"
        title="Where households are moving, we underwrite."
        lede="Core focus across Florida, Georgia, the Carolinas, and Texas — with select looks in Tennessee, Alabama, and the broader Sun Belt."
      />

      <section className="bg-ink py-20 text-paper sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <MarketExplorer />
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
              Directory
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
              Every metro we keep on the desk.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETS.map((m, i) => (
              <Reveal key={m.state} delayMs={i * 40} className="border-t border-hairline pt-5">
                <p className="text-[0.65rem] font-medium tracking-[0.16em] uppercase text-muted">
                  {m.region}
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{m.state}</h3>
                <ul className="mt-4 space-y-1.5">
                  {m.metros.map((metro) => (
                    <li key={metro} className="text-sm text-muted">
                      {metro}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-paper pb-20">
        <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/images/community.jpg"
              alt="Sun Belt apartment community in late afternoon light"
              width={1792}
              height={1008}
              className="aspect-16/7 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-ink py-16 text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl tracking-tight">Have an offering in one of these metros?</p>
          <Button asChild variant="primary">
            <Link to="/contact">
              Send the file
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
