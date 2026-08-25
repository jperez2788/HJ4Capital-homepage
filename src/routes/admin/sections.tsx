import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  getSectionOrder,
  saveSectionOrder,
  SECTION_DEFS,
  type SectionId,
} from "@/lib/page-sections";

// SCAFFOLD — not linked from the site nav and not auth-gated yet.
// Before shipping: gate this route behind a real session check (see
// src/lib/auth/gate-session.server.ts for the auth primitives already in
// this project) so only an admin can reach /admin/sections.
export const Route = createFileRoute("/admin/sections")({
  component: SectionsAdmin,
  loader: () => getSectionOrder(),
});

function SectionsAdmin() {
  const initialOrder = Route.useLoaderData();
  const [order, setOrder] = useState<SectionId[]>(initialOrder);
  const [saving, setSaving] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));
  const labels = Object.fromEntries(
    SECTION_DEFS.map((s) => [s.id, s.label]),
  ) as Record<SectionId, string>;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setOrder((current) => {
      const oldIndex = current.indexOf(active.id as SectionId);
      const newIndex = current.indexOf(over.id as SectionId);
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveSectionOrder({ data: order });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-2xl">Homepage sections</h1>
      <p className="mt-2 text-sm text-stone">
        Drag to reorder. Save persists the order; the homepage itself doesn't
        read it yet — see the TODO in{" "}
        <code className="text-xs">src/lib/page-sections.ts</code>.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <ul className="mt-6 flex flex-col gap-2">
            {order.map((id) => (
              <SortableRow key={id} id={id} label={labels[id]} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-6 rounded-md bg-ink px-4 py-2 text-sm text-paper disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save order"}
      </button>
    </main>
  );
}

function SortableRow({ id, label }: { id: SectionId; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex cursor-grab items-center justify-between rounded-md border border-black/10 bg-white px-4 py-3 text-sm active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <span>{label}</span>
      <span className="text-stone">⠿</span>
    </li>
  );
}
