import { Link, type LinkProps } from "@tanstack/react-router";
import { MapPin, Phone, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { DISCLAIMER, FOCUS, NAV, SITE } from "@/lib/site";

export type FooterLink = { text: string; to?: LinkProps["to"]; href?: string };

export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterContact = { icon: LucideIcon; text: string; href?: string; isAddress?: boolean };

export type FooterSocial = { icon: LucideIcon; label: string; href: string };

export type Footer4ColProps = {
  description?: string;
  columns?: FooterColumn[];
  contact?: FooterContact[];
  socials?: FooterSocial[];
};

const defaultColumns: FooterColumn[] = [
  {
    title: "Pages",
    links: [
      { text: "Home", to: "/" },
      ...NAV.map((item) => ({ text: item.label, to: item.href })),
      { text: "Submit a deal", to: "/contact" },
    ],
  },
  {
    title: "Focus",
    links: FOCUS.slice(0, 4).map((item) => ({ text: item.title })),
  },
];

const defaultContact: FooterContact[] = [
  { icon: Phone, text: SITE.phone, href: SITE.phoneHref },
  { icon: MapPin, text: SITE.address, href: SITE.mapsHref, isAddress: true },
];

const linkClass =
  "text-foreground/70 transition-[color] duration-150 ease-out hover:text-ink";

function FooterLinkItem({ text, to, href }: FooterLink) {
  if (to) {
    return (
      <Link to={to} className={linkClass}>
        {text}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={linkClass}>
        {text}
      </a>
    );
  }
  return <span className="text-foreground/70">{text}</span>;
}

export default function Footer4Col({
  description = SITE.tagline,
  columns = defaultColumns,
  contact = defaultContact,
  socials = [],
}: Footer4ColProps) {
  return (
    <footer className="mt-16 w-full rounded-t-xl bg-paper-2">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center sm:justify-start">
              <Logo tone="ink" />
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-muted sm:max-w-xs sm:text-left">
              {description}
            </p>

            {socials.length > 0 && (
              <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                {socials.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink transition-[opacity] duration-150 ease-out hover:opacity-70"
                    >
                      <span className="sr-only">{label}</span>
                      <Icon className="size-6" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            {columns.map((column) => (
              <div key={column.title} className="text-center sm:text-left">
                <p className="text-lg font-medium">{column.title}</p>
                <ul className="mt-8 space-y-4 text-sm">
                  {column.links.map((link) => (
                    <li key={link.text}>
                      <FooterLinkItem {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Contact</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contact.map(({ icon: Icon, text, href, isAddress }) => {
                  const body = (
                    <>
                      <Icon className="size-5 shrink-0 text-ink" />
                      {isAddress ? (
                        <address className="-mt-0.5 flex-1 text-foreground/70 not-italic">
                          {text}
                        </address>
                      ) : (
                        <span className="flex-1 text-foreground/70">{text}</span>
                      )}
                    </>
                  );
                  const rowClass =
                    "flex items-start justify-center gap-1.5 sm:justify-start";
                  return (
                    <li key={text}>
                      {href ? (
                        <a
                          href={href}
                          className={`${rowClass} transition-[opacity] duration-150 ease-out hover:opacity-70`}
                          {...(href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {body}
                        </a>
                      ) : (
                        <div className={rowClass}>{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-hairline pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-muted">{DISCLAIMER}</p>
          <div className="mt-6 text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-muted">All rights reserved.</p>
            <p className="mt-4 text-sm text-muted sm:order-first sm:mt-0">
              &copy; {new Date().getFullYear()} {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
