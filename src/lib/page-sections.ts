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

/** Persist a new drag order. Replaces the table wholesale — nine rows, fine as one transaction. */
export const saveSectionOrder = createServerFn({ method: "POST" })
  .validator((order: SectionId[]) => order)
  .handler(async ({ data: order }) => {
    const sql = await getSql();
    await sql.query("DELETE FROM page_sections", []);
    for (const [i, id] of order.entries()) {
      await sql.query(
        "INSERT INTO page_sections (id, position) VALUES ($1, $2)",
        [id, i],
      );
    }
  });

// TODO(wire-up): once you're happy with this, make `Home` in
// src/routes/index.tsx data-driven — loader calls getSectionOrder(),
// then `order.map(id => SECTION_COMPONENTS[id])` instead of the fixed
// <Hero /><Ticker />... stack.
