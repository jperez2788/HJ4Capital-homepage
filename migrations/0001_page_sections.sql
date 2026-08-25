-- Order (and, later, per-section content overrides) for the homepage's
-- section stack. One row per section id; `position` is the drag order.
-- Applied automatically on both Neon and PGLite (see src/lib/db.ts).
CREATE TABLE IF NOT EXISTS page_sections (
  id TEXT PRIMARY KEY,
  position INTEGER NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
