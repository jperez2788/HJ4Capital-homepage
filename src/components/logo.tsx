import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/hj4-capital-gold-logo.png"
      alt=""
      width={1536}
      height={1024}
      className={cn("h-auto w-32 object-contain", className)}
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
        "inline-flex items-center",
        tone === "paper" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <img
        src="/images/hj4-capital-gold-logo.png"
        alt="HJ4 Capital — Real Estate · Investment · Wealth"
        width={1536}
        height={1024}
        className="block h-auto w-28 object-contain sm:w-32"
      />
    </span>
  );
}
