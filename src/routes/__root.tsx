import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/site";
import appCss from "../styles.css?url";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  description: SITE.tagline,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "2330 Caravelle Cir",
    addressLocality: "Kissimmee",
    addressRegion: "FL",
    postalCode: "34746",
    addressCountry: "US",
  },
  areaServed: ["Florida", "Georgia", "North Carolina", "South Carolina", "Texas"],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — Southeast Multifamily Investment` },
      {
        name: "description",
        content:
          "HJ4 Capital is a real estate investment group founded by Henry and Jeremy, focused on multifamily and income-producing properties across Florida, Georgia, the Carolinas, Texas, and the Southeast.",
      },
      { name: "theme-color", content: "#0c0c0b" },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh bg-paper text-foreground font-sans">
        <PreviewHostBridge />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <SiteHeader />
          <Outlet />
          <SiteFooter />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main id="main" className="bg-ink px-5 pt-36 pb-24 text-paper sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-steel">404</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight">This page is not listed.</h1>
        <p className="mt-4 max-w-md text-stone">
          The link may be outdated. Return home or send us an opportunity directly.
        </p>
        <div className="mt-8 flex gap-6">
          <Link to="/" className="text-paper underline-offset-4 hover:underline">
            Home
          </Link>
          <Link to="/contact" className="text-paper underline-offset-4 hover:underline">
            Submit a deal
          </Link>
        </div>
      </div>
    </main>
  );
}
