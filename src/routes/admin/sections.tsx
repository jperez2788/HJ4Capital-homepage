import { useRef, useState } from "react";
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
  getSectionContent,
  getSectionOrder,
  saveSections,
  SECTION_DEFS,
  SECTION_FIELDS,
  type SectionContent,
  type SectionId,
} from "@/lib/page-sections";
import { deletePhoto, listPhotos, uploadPhoto, type PhotoInfo } from "@/lib/site-photos";

// SCAFFOLD — not linked from the site nav and not auth-gated yet.
// Before shipping: gate this route behind a real session check (see
// src/lib/auth/gate-session.server.ts for the auth primitives already in
// this project) so only an admin can reach /admin/sections.
export const Route = createFileRoute("/admin/sections")({
  component: SectionsAdmin,
  loader: async () => {
    const [order, content, photos] = await Promise.all([
      getSectionOrder(),
      getSectionContent(),
      listPhotos(),
    ]);
    return { order, content, photos };
  },
});

function SectionsAdmin() {
  const initial = Route.useLoaderData();
  const [order, setOrder] = useState<SectionId[]>(initial.order);
  const [content, setContent] = useState(initial.content);
  const [photos, setPhotos] = useState<PhotoInfo[]>(initial.photos);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openId, setOpenId] = useState<SectionId | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const labels = Object.fromEntries(SECTION_DEFS.map((s) => [s.id, s.label])) as Record<
    SectionId,
    string
  >;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setOrder((current) => {
      const oldIndex = current.indexOf(active.id as SectionId);
      const newIndex = current.indexOf(over.id as SectionId);
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  function setField(id: SectionId, key: string, value: string) {
    setSaved(false);
    setContent((current) => ({
      ...current,
      [id]: { ...current[id], [key]: value },
    }));
  }

  async function refreshPhotos() {
    setPhotos(await listPhotos());
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveSections({ data: { order, content } });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-2xl">Homepage sections</h1>
      <p className="mt-2 text-sm text-stone">
        Drag to reorder. Click a section with fields to edit its text and
        photos. Ticker, Focus, Approach, and FAQ don't have editable fields
        yet — reorder only.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <ul className="mt-6 flex flex-col gap-2">
            {order.map((id) => (
              <SortableRow
                key={id}
                id={id}
                label={labels[id]}
                open={openId === id}
                onToggle={() => setOpenId((cur) => (cur === id ? null : id))}
                fields={SECTION_FIELDS[id]}
                content={content[id] ?? {}}
                photos={photos}
                onFieldChange={(key, value) => setField(id, key, value)}
                onPhotosChanged={refreshPhotos}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-ink px-4 py-2 text-sm text-paper disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-stone">Saved — refresh the homepage to see it.</span>}
      </div>

      <PhotoLibrary photos={photos} onChanged={refreshPhotos} />
    </main>
  );
}

function SortableRow({
  id,
  label,
  open,
  onToggle,
  fields,
  content,
  photos,
  onFieldChange,
  onPhotosChanged,
}: {
  id: SectionId;
  label: string;
  open: boolean;
  onToggle: () => void;
  fields: (typeof SECTION_FIELDS)[SectionId];
  content: SectionContent;
  photos: PhotoInfo[];
  onFieldChange: (key: string, value: string) => void;
  onPhotosChanged: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-md border border-black/10 bg-white text-sm ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing"
          aria-label={`Drag ${label}`}
          {...attributes}
          {...listeners}
        >
          ⠿
        </button>
        <span className="flex-1 px-3">{label}</span>
        {fields ? (
          <button type="button" onClick={onToggle} className="text-stone underline">
            {open ? "Close" : "Edit"}
          </button>
        ) : (
          <span className="text-xs text-stone">reorder only</span>
        )}
      </div>

      {open && fields && (
        <div className="flex flex-col gap-4 border-t border-black/10 px-4 py-4">
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-stone">
                {field.label}
              </span>
              {field.type === "image" ? (
                <ImageField
                  value={content[field.key] ?? ""}
                  photos={photos}
                  onChange={(v) => onFieldChange(field.key, v)}
                  onPhotosChanged={onPhotosChanged}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  value={content[field.key] ?? ""}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                  rows={3}
                  className="rounded-md border border-black/15 px-3 py-2"
                />
              ) : (
                <input
                  type="text"
                  value={content[field.key] ?? ""}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                  className="rounded-md border border-black/15 px-3 py-2"
                />
              )}
            </label>
          ))}
        </div>
      )}
    </li>
  );
}

function ImageField({
  value,
  photos,
  onChange,
  onPhotosChanged,
}: {
  value: string;
  photos: PhotoInfo[];
  onChange: (name: string) => void;
  onPhotosChanged: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      const result = await uploadPhoto({ data: form });
      await onPhotosChanged();
      onChange(result.name);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value && (
        <img
          src={`/images/${value}`}
          alt=""
          className="size-14 rounded-md border border-black/10 object-cover"
        />
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-black/15 px-3 py-2"
      >
        {!photos.some((p) => p.name === value) && value && (
          <option value={value}>{value} (missing)</option>
        )}
        {photos.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="rounded-md border border-black/15 px-3 py-2 text-xs disabled:opacity-50"
      >
        {uploading ? "Uploading…" : "Upload new"}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function PhotoLibrary({ photos, onChanged }: { photos: PhotoInfo[]; onChanged: () => void }) {
  async function handleDelete(name: string) {
    if (!confirm(`Delete ${name}? Any section still using it will show a broken image.`)) return;
    await deletePhoto({ data: name });
    await onChanged();
  }

  return (
    <section className="mt-12 border-t border-black/10 pt-8">
      <h2 className="font-display text-lg">Photo library</h2>
      <p className="mt-1 text-sm text-stone">
        Every file in <code className="text-xs">public/images</code>. Uploads here write straight
        to the running server's disk — that's real in dev, but it does not survive a redeploy
        (the next build bakes <code className="text-xs">public/</code> from what's committed to
        git). Commit a photo you want to keep.
      </p>
      <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((p) => (
          <li key={p.name} className="flex flex-col gap-1.5">
            <img
              src={`/images/${p.name}`}
              alt=""
              className="aspect-square w-full rounded-md border border-black/10 object-cover"
            />
            <span className="truncate text-xs text-stone">{p.name}</span>
            <button
              type="button"
              onClick={() => handleDelete(p.name)}
              className="text-left text-xs text-red-600 underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
