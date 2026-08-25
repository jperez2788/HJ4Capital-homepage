import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About — ${SITE.name}` },
      {
        name: "description",
        content:
          "HJ4 Capital was founded by Henry and Jeremy to build a disciplined real estate investment platform focused on income-producing properties across the Southeast.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <main id="main">
      <PageHero
        kicker="About"
        title="A two-principal platform with a long view."
        lede="HJ4 Capital was founded by Henry and Jeremy to acquire and improve income-producing real estate — carefully, and for the hold."
      />

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/facade.jpg"
                alt="Renovated brick garden apartments at dusk"
                width={1728}
                height={1152}
                className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delayMs={80}>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
              The firm
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
              Built around underwriting, not theater.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Henry and Jeremy started HJ4 Capital to do one thing well: identify
              multifamily and income-producing property in markets where people
              actually want to live — then own those assets with a disciplined
              plan.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The work is practical. Rent rolls. Taxes. Insurance. Capex. Who is
              already in the submarket, and what they are getting for the same
              unit. We would rather pass on a file than force a story onto it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
              How we work
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
              Independent analysis. Conservative numbers. A network we use, not
              a brand we borrow.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Independent",
                body: "HJ4 Capital is its own investment group. Decisions sit with the principals. There is no outside mandate driving the pipeline.",
              },
              {
                title: "Networked",
                body: "We participate in the Grant Cardone Real Estate Club for education, investor conversation, and market insight. That is exposure — not an endorsement or affiliation.",
              },
              {
                title: "Direct",
                body: "Brokers and owners talk to the people who will underwrite the deal. If we are interested, you will know. If we are not, you will also know.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delayMs={i * 60} className="border-t border-hairline pt-6">
                <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-steel">
              Next
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
              If you have a file in our markets, send it.
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <Button asChild variant="primary">
              <Link to="/contact">
                Submit a deal
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
