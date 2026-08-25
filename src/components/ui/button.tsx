import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans text-sm font-medium tracking-wide whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-steel/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink transition-[scale,background-color,color,border-color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-paper text-ink hover:bg-paper-2 rounded-sm px-5 min-h-11",
        ink: "bg-ink text-paper hover:bg-ink-soft rounded-sm px-5 min-h-11",
        ghost:
          "bg-transparent text-paper border border-paper/25 hover:border-paper/55 hover:bg-paper/5 rounded-sm px-5 min-h-11",
        ghostInk:
          "bg-transparent text-foreground border border-foreground/15 hover:border-foreground/35 hover:bg-ink/5 rounded-sm px-5 min-h-11",
        link: "bg-transparent text-inherit underline-offset-4 hover:underline min-h-11 px-0 rounded-none",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-10 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
