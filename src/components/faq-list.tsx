import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FaqList({ dark = false }: { dark?: boolean }) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-current/15">
      {FAQS.map((item) => (
        <Accordion.Item
          key={item.q}
          value={item.q}
          className="border-b border-current/15"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "group flex w-full items-start justify-between gap-6 py-5 text-left min-h-11",
                dark ? "text-paper" : "text-ink",
              )}
            >
              <span className="font-display text-xl tracking-tight sm:text-2xl">
                {item.q}
              </span>
              <Plus
                className="mt-1 size-5 shrink-0 transition-[transform] duration-200 ease-out group-data-[state=open]:rotate-45"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-none">
            <p
              className={cn(
                "max-w-2xl pb-6 text-sm leading-relaxed sm:text-base",
                dark ? "text-stone" : "text-muted",
              )}
            >
              {item.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
