import { createServerFn } from "@tanstack/react-start";
import { getSql } from "./db";

/**
 * The homepage's section stack (see `Home` in `src/routes/index.tsx`), given
 * stable ids so drag order can be persisted independently of render order.
 * Add a new section here first, then render it from `<Home>` by id.
 */
export const SECTION_DEFS = [
  { id: "hero", label: "Hero" },
  { id: "ticker", label: "Ticker" },
  { id: "thesis", label: "Thesis" },
  { id: "focus", label: "Focus" },
  { id: "markets", label: "Markets" },
  { id: "approach", label: "Approach" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTION_DEFS)[number]["id"];

const DEFAULT_ORDER: SectionId[] = SECTION_DEFS.map((s) => s.id);

// ---------------------------------------------------------------------------
// Content: editable text/image fields per section.
//
// Not every section has fields yet — Ticker, Focus, Approach, and FAQ render
// from list data (TICKER/FOCUS/STEPS in src/lib/site.ts, or their own
// components) rather than flat text, so they're reorder-only for now. Adding
// a field here is a two-step process: add it to both `SECTION_FIELDS` and
// `DEFAULT_CONTENT` below, then read `content.<key>` in the matching section
// component in src/routes/index.tsx.
// ---------------------------------------------------------------------------

export type FieldType = "text" | "textarea" | "image";
export type FieldDef = { key: string; label: string; type: FieldType };
export type SectionContent = Record<string, string>;

export const SECTION_FIELDS: Partial<Record<SectionId, FieldDef[]>> = {
  hero: [
    { key: "kicker", label: "Kicker", type: "text" },
    { key: "title", label: "Headline", type: "textarea" },
    { key: "body", label: "Body", type: "textarea" },
    { key: "image", label: "Background photo", type: "image" },
    { key: "imageAlt", label: "Photo description (for screen readers)", type: "text" },
  ],
  thesis: [
    { key: "kicker", label: "Kicker", type: "text" },
    { key: "title", label: "Headline", type: "textarea" },
    { key: "body", label: "Body", type: "textarea" },
    { key: "body2", label: "Body (second paragraph)", type: "textarea" },
    { key: "image", label: "Photo", type: "image" },
    { key: "imageAlt", label: "Photo description (for screen readers)", type: "text" },
  ],
  markets: [
    { key: "kicker", label: "Kicker", type: "text" },
    { key: "title", label: "Headline", type: "textarea" },
    { key: "image", label: "Photo", type: "image" },
    { key: "imageAlt", label: "Photo description (for screen readers)", type: "text" },
  ],
  about: [
    { key: "kicker", label: "Kicker", type: "text" },
    { key: "title", label: "Headline", type: "textarea" },
    { key: "body", label: "Body", type: "textarea" },
    { key: "body2", label: "Body (second paragraph)", type: "textarea" },
    { key: "image", label: "Photo", type: "image" },
    { key: "imageAlt", label: "Photo description (for screen readers)", type: "text" },
  ],
  contact: [
    { key: "kicker", label: "Kicker", type: "text" },
    { key: "title", label: "Headline", type: "textarea" },
    { key: "body", label: "Body", type: "textarea" },
  ],
};

/** Current hardcoded copy, so an unedited page renders byte-identical to before. */
export const DEFAULT_CONTENT: Partial<Record<SectionId, SectionContent>> = {
  hero: {
    kicker: "Real estate investment · Southeast",
    title: "Building long-term value across high-growth markets.",
    body: "HJ4 Capital is a real estate investment group founded by Henry and Jeremy. We acquire and improve multifamily and income-producing properties across Florida, Georgia, the Carolinas, Texas, and the Sun Belt.",
    image: "hero.jpg",
    imageAlt: "Bright daytime skyline view of Miami with modern skyscrapers and waterfront",
  },
  thesis: {
    kicker: "01 — Thesis",
    title: "Growth is not a thesis. Underwriting is.",
    body: "The Southeast continues to absorb households, jobs, and renters. That is the backdrop — not the deal. HJ4 Capital was founded to look at income-producing real estate the way operators do: rents, expenses, capital needs, and a hold that can survive a cycle.",
    body2: "We evaluate multifamily and select income properties with independent analysis, conservative assumptions, and practical diligence. If the file does not work on paper, it does not leave the desk.",
    image: "courtyard.jpg",
    imageAlt: "Golden-hour courtyard and pool at a garden-style apartment community",
  },
  markets: {
    kicker: "03 — Where we look",
    title: "High-growth Southeast and Sun Belt markets.",
    image: "community.jpg",
    imageAlt: "Late-afternoon view across a Sun Belt apartment community",
  },
  about: {
    kicker: "05 — The firm",
    title: "Founded by Henry and Jeremy.",
    body: "HJ4 Capital is a disciplined platform for income-producing real estate — built by two principals who underwrite together, decide together, and stay close to the asset after closing.",
    body2: "As part of our continued growth, we participate in the Grant Cardone Real Estate Club for education, market conversation, and a broader investor network. The firm itself remains independent.",
    image: "lobby.jpg",
    imageAlt: "Quiet lobby in stone, oak, and linen",
  },
  contact: {
    kicker: "07 — Contact",
    title: "Have a real estate opportunity?",
    body: "Brokers, owners, lenders, operators, and partners — send the file. We are actively reviewing multifamily and income-producing properties across our markets.",
  },
};

/**
 * Current section order, seeded from `DEFAULT_ORDER` the first time it's
 * read (so a fresh DB — first PGLite boot, first Neon deploy — renders
 * identically to the hardcoded stack until someone actually reorders).
 */
export const getSectionOrder = createServerFn({ method: "GET" }).handler(
  async (): Promise<SectionId[]> => {
    const sql = await getSql();
    const rows = await sql<{ id: string }>`
      SELECT id FROM page_sections ORDER BY position ASC
    `;
    if (rows.length === 0) return DEFAULT_ORDER;
    return rows.map((r) => r.id as SectionId);
  },
);

/** Saved content for every section, merged over `DEFAULT_CONTENT` — an unedited field keeps its default. */
export const getSectionContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<Partial<Record<SectionId, SectionContent>>> => {
    const sql = await getSql();
    const rows = await sql<{ id: string; content: SectionContent }>`
      SELECT id, content FROM page_sections
    `;
    const saved = Object.fromEntries(rows.map((r) => [r.id, r.content]));
    const merged: Partial<Record<SectionId, SectionContent>> = {};
    for (const id of Object.keys(SECTION_FIELDS) as SectionId[]) {
      merged[id] = { ...DEFAULT_CONTENT[id], ...saved[id] };
    }
    return merged;
  },
);

/**
 * Persist both drag order and every section's content in one save. Order
 * always has all nine ids; content only carries the sections with fields.
 */
export const saveSections = createServerFn({ method: "POST" })
  .validator(
    (input: {
      order: SectionId[];
      content: Partial<Record<SectionId, SectionContent>>;
    }) => input,
  )
  .handler(async ({ data: { order, content } }) => {
    const sql = await getSql();
    for (const [i, id] of order.entries()) {
      await sql.query(
        `INSERT INTO page_sections (id, position, content)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET position = $2, content = $3, updated_at = now()`,
        [id, i, JSON.stringify(content[id] ?? {})],
      );
    }
  });
