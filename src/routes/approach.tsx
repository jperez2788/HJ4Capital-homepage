import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { FOCUS, SITE, STEPS } from "@/lib/site";

export const Route = createFileRoute("/approach")({
  component: ApproachPage,
  head: () => ({
    meta: [
      { title: `Approach — ${SITE.name}` },
      {
        name: "description",
        content:
          "How HJ4 Capital sources, screens, underwrites, and owns multifamily and income-producing real estate across the Southeast.",
      },
    ],
  }),
});

function ApproachPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Approach"
        title="Conservative paper. Practical execution."
        lede="We do not buy a story. We buy a rent roll, a building, and a plan that still works when insurance and taxes move."
      />

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ol className="grid gap-0">
            {STEPS.map((step) => (
              <Reveal key={step.n}>
                <li className="grid gap-4 border-t border-hairline py-10 lg:grid-cols-12 lg:gap-8">
                  <p className="font-display text-sm text-muted lg:col-span-2">{step.n}</p>
                  <h2 className="font-display text-3xl tracking-tight lg:col-span-4">{step.title}</h2>
                  <p className="text-base leading-relaxed text-muted lg:col-span-6">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-steel">
              What we look at
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight">
              Every opportunity through a practical lens.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone">
              Rent comparables, occupancy, expenses, taxes, insurance, financing,
              capital needs, and exit. If a line item is uncertain, we assume the
              worse number — not the pitch number.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6" delayMs={80}>
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/facade.jpg"
                alt="Value-add garden apartments after renovation"
                width={1728}
                height={1152}
                className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-paper/10"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
              Focus
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
              Six things we actually do.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {FOCUS.map((item, i) => (
              <Reveal key={item.n} delayMs={i * 40} className="border-t border-hairline pt-5">
                <p className="font-display text-sm text-muted">{item.n}</p>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-display text-2xl tracking-tight">
            If the file is real, we will give it a real look.
          </p>
          <Button asChild variant="primary">
            <Link to="/contact">
              Submit a deal
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
