import { useState } from "react";
import { MARKETS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MarketExplorer({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const current = MARKETS[active] ?? MARKETS[0];

  return (
    <div className={cn("grid gap-10", !compact && "lg:grid-cols-12 lg:gap-16")}>
      <div className={cn(!compact && "lg:col-span-5")}>
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-steel">
          Target markets
        </p>
        <ul className="mt-6 divide-y divide-hairline-dark border-y border-hairline-dark">
          {MARKETS.map((m, i) => (
            <li key={m.state}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex w-full min-h-14 items-baseline justify-between gap-4 py-3 text-left transition-[color,opacity] duration-150 ease-out",
                  i === active ? "text-paper" : "text-stone hover:text-paper",
                )}
              >
                <span className="font-display text-2xl tracking-tight sm:text-3xl">
                  {m.state}
                </span>
                <span className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-steel">
                  {m.region}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn(!compact && "lg:col-span-7")}>
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-steel">
          Key metros · {current.state}
        </p>
        <ul className="mt-6 grid gap-px bg-hairline-dark sm:grid-cols-2">
          {current.metros.map((metro) => (
            <li
              key={metro}
              className="bg-ink px-5 py-5 font-display text-xl tracking-tight text-paper sm:text-2xl"
            >
              {metro}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
          We underwrite where households, jobs, and rental demand are compounding —
          then we get specific on submarket, vintage, and basis.
        </p>
      </div>
    </div>
  );
}
