import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo-mark.png"
      alt=""
      width={256}
      height={256}
      className={cn("size-8", className)}
      aria-hidden="true"
    />
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
