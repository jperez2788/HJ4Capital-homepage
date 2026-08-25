import { Reveal } from "@/components/reveal";

export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="bg-ink pt-28 pb-16 text-paper sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-steel">{kicker}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg">{lede}</p>
        </Reveal>
      </div>
    </section>
  );
}
