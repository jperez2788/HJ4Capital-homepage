import { createFileRoute } from "@tanstack/react-router";
import { DealForm } from "@/components/deal-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.name}` },
      {
        name: "description",
        content:
          "Submit a multifamily or income-producing real estate opportunity to HJ4 Capital, or call (347) 633-0180.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Contact"
        title="Send the offering. Or pick up the phone."
        lede="Brokers, owners, lenders, operators, and partners — we are reviewing multifamily and income-producing properties across the Southeast."
      />

      <section className="bg-ink pb-24 text-paper">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/lobby.jpg"
                alt="Stone and oak lobby interior"
                width={1728}
                height={1152}
                className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-paper/10"
              />
            </div>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-xs font-medium tracking-[0.18em] uppercase text-steel">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={SITE.phoneHref}
                    className="font-display text-3xl tracking-tight transition-[opacity] duration-150 ease-out hover:opacity-70"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-[0.18em] uppercase text-steel">
                  Office
                </dt>
                <dd className="mt-2">
                  <a
                    href={SITE.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base text-stone transition-[color] duration-150 ease-out hover:text-paper"
                  >
                    {SITE.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-[0.18em] uppercase text-steel">
                  For
                </dt>
                <dd className="mt-2 text-base text-stone">
                  Acquisition opportunities, broker inquiries, lender
                  introductions, and partnership discussions.
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-7" delayMs={80}>
            <p className="mb-6 text-xs font-medium tracking-[0.18em] uppercase text-steel">
              Submit a deal
            </p>
            <DealForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
