import { ChevronDown } from "lucide-react";
import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-hairline-dark bg-ink-soft px-3.5 text-sm text-paper placeholder:text-stone/55 outline-none transition-[border-color,box-shadow] duration-150 ease-out focus-visible:border-steel focus-visible:ring-2 focus-visible:ring-steel/30",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-sm border border-hairline-dark bg-ink-soft px-3.5 pr-10 text-sm text-paper outline-none transition-[border-color,box-shadow] duration-150 ease-out focus-visible:border-steel focus-visible:ring-2 focus-visible:ring-steel/30",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-stone"
        aria-hidden
      />
    </div>
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full resize-y rounded-md border border-hairline-dark bg-ink-soft px-3.5 py-3 text-sm text-paper placeholder:text-stone/55 outline-none transition-[border-color,box-shadow] duration-150 ease-out focus-visible:border-steel focus-visible:ring-2 focus-visible:ring-steel/30",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-xs font-medium tracking-[0.14em] uppercase text-stone",
        className,
      )}
      {...props}
    />
  );
}
