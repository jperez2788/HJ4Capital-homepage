import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DealForm } from "@/components/deal-form";
import { FaqList } from "@/components/faq-list";
import { MarketExplorer } from "@/components/market-explorer";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { FOCUS, SITE, STEPS, TICKER } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main id="main">
      <Hero />
      <Ticker />
      <Thesis />
      <Focus />
      <Markets />
      <Approach />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-ink text-paper">
      <img
        src="/images/hero.jpg"
        alt="Bright daytime skyline view of Miami with modern skyscrapers and waterfront"
        width={1792}
        height={1008}
        className="absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-paper/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-14">
        <p className="reveal is-in text-xs font-medium tracking-[0.22em] uppercase text-stone">
          Real estate investment · Southeast
        </p>
        <h1
          className="reveal is-in mt-5 max-w-4xl font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ transitionDelay: "80ms" }}
        >
          Building long-term value across high-growth markets.
        </h1>
        <p
          className="reveal is-in mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg"
          style={{ transitionDelay: "160ms" }}
        >
          HJ4 Capital is a real estate investment group founded by Henry and Jeremy.
          We acquire and improve multifamily and income-producing properties across
          Florida, Georgia, the Carolinas, Texas, and the Sun Belt.
        </p>
        <div
          className="reveal is-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ transitionDelay: "220ms" }}
        >
          <Button asChild variant="primary">
            <Link to="/contact">
              Submit a deal
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <a href={SITE.phoneHref}>Call {SITE.phone}</a>
          </Button>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px bg-paper/15 sm:grid-cols-4">
          <Fact label="Principals" value="Henry & Jeremy" />
          <Fact label="Focus" value="Multifamily" />
          <Fact label="Footprint" value="FL · GA · Carolinas · TX" />
          <Fact label="Status" value="Actively reviewing" />
        </dl>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink/80 px-4 py-4 backdrop-blur-sm sm:px-5">
      <dt className="text-[0.65rem] font-medium tracking-[0.16em] uppercase text-steel">{label}</dt>
      <dd className="mt-1.5 text-sm text-paper">{value}</dd>
    </div>
  );
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y border-hairline-dark bg-ink-soft py-4 text-paper">
      <div className="ticker-track flex w-max gap-10 pr-10">
        {items.map((city, i) => (
          <span key={`${city}-${i}`} className="flex items-center gap-10 text-sm tracking-wide text-stone">
            {city}
            <span className="size-1 rounded-full bg-steel" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

function Thesis() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">01 — Thesis</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Growth is not a thesis. Underwriting is.
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-7" delayMs={80}>
          <p className="text-lg leading-relaxed text-foreground/90">
            The Southeast continues to absorb households, jobs, and renters. That
            is the backdrop — not the deal. HJ4 Capital was founded to look at
            income-producing real estate the way operators do: rents, expenses,
            capital needs, and a hold that can survive a cycle.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted">
            We evaluate multifamily and select income properties with independent
            analysis, conservative assumptions, and practical diligence. If the
            file does not work on paper, it does not leave the desk.
          </p>
          <Button asChild variant="ink" className="mt-8">
            <Link to="/approach">
              How we underwrite
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-xl">
          <img
            src="/images/courtyard.jpg"
            alt="Golden-hour courtyard and pool at a garden-style apartment community"
            width={1728}
            height={1152}
            className="aspect-16/8 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        </div>
      </Reveal>
    </section>
  );
}

function Focus() {
  return (
    <section className="border-t border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
            02 — Investment focus
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Acquire, improve, and hold income-producing assets.
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 lg:gap-x-16">
          {FOCUS.map((item, i) => (
            <Reveal key={item.n} delayMs={i * 40}>
              <article className="flex gap-5 border-t border-hairline py-8 sm:gap-8">
                <span className="font-display text-sm tracking-wide text-muted">{item.n}</span>
                <div>
                  <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Markets() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-steel">
            03 — Where we look
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            High-growth Southeast and Sun Belt markets.
          </h2>
        </Reveal>
        <Reveal className="mt-14" delayMs={80}>
          <MarketExplorer />
        </Reveal>
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/images/community.jpg"
              alt="Late-afternoon view across a Sun Belt apartment community"
              width={1792}
              height={1008}
              className="aspect-16/8 w-full object-cover outline outline-1 -outline-offset-1 outline-paper/10"
            />
          </div>
          <div className="mt-8">
            <Button asChild variant="ghost">
              <Link to="/markets">
                Full market list
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
            04 — How a file moves
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            A short path. A long hold.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.n}>
              <Reveal delayMs={i * 50}>
                <div className="border-t border-hairline pt-5">
                  <p className="font-display text-sm text-muted">{step.n}</p>
                  <h3 className="mt-2 font-display text-2xl tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-t border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/images/lobby.jpg"
              alt="Quiet lobby in stone, oak, and linen"
              width={1728}
              height={1152}
              className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-6" delayMs={80}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">
            05 — The firm
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Founded by Henry and Jeremy.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            HJ4 Capital is a disciplined platform for income-producing real estate
            — built by two principals who underwrite together, decide together, and
            stay close to the asset after closing.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            As part of our continued growth, we participate in the Grant Cardone
            Real Estate Club for education, market conversation, and a broader
            investor network. The firm itself remains independent.
          </p>
          <Button asChild variant="ink" className="mt-8">
            <Link to="/about">
              About HJ4
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-hairline bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted">06 — FAQ</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Straight answers.
          </h2>
        </Reveal>
        <Reveal className="mt-10" delayMs={60}>
          <FaqList />
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-steel">
            07 — Contact
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Have a real estate opportunity?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone">
            Brokers, owners, lenders, operators, and partners — send the file.
            We are actively reviewing multifamily and income-producing properties
            across our markets.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-8 inline-block font-display text-3xl tracking-tight transition-[opacity] duration-150 ease-out hover:opacity-70"
          >
            {SITE.phone}
          </a>
          <p className="mt-2 text-sm text-stone">{SITE.address}</p>
        </Reveal>
        <Reveal className="lg:col-span-7" delayMs={80}>
          <DealForm />
        </Reveal>
      </div>
    </section>
  );
}
