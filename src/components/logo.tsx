import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect x="1.25" y="1.25" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <rect x="17.25" y="1.25" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <rect x="1.25" y="17.25" width="13.5" height="13.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <rect x="17.25" y="17.25" width="13.5" height="7.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "paper",
}: {
  className?: string;
  tone?: "paper" | "ink";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "paper" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <LogoMark className="size-7" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-tight">HJ4</span>
        <span className="mt-0.5 text-[0.62rem] font-medium tracking-[0.28em] uppercase">
          Capital
        </span>
      </span>
    </span>
  );
}
