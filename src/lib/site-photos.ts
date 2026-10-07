import { createServerFn } from "@tanstack/react-start";
import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const imagesDir = () => path.join(process.cwd(), "public", "images");

/**
 * Reject anything that isn't a bare filename — no `..`, no `/`, no leading
 * dot. Every path in this module is built from a validated name before it
 * ever touches the filesystem.
 */
function assertSafeFilename(name: string): void {
  if (!name || name.includes("/") || name.includes("\\") || name.startsWith(".")) {
    throw new Error(`Invalid filename: ${name}`);
  }
}

export type PhotoInfo = { name: string; size: number };

/** Every image currently in `public/images`, for the admin picker. */
export const listPhotos = createServerFn({ method: "GET" }).handler(
  async (): Promise<PhotoInfo[]> => {
    const dir = imagesDir();
    await mkdir(dir, { recursive: true });
    const entries = await readdir(dir);
    const photos = await Promise.all(
      entries
        .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
        .map(async (name) => {
          const { size } = await stat(path.join(dir, name));
          return { name, size };
        }),
    );
    return photos.sort((a, b) => a.name.localeCompare(b.name));
  },
);

/**
 * Write an uploaded file into `public/images`.
 *
 * CAVEAT: this writes to the running server's local disk. That's real and
 * immediate in dev (Vite serves `public/` straight off disk) and on a
 * long-lived container. It does NOT persist across a redeploy — the next
 * `docker build` bakes `public/` from what's committed to git, replacing the
 * container's filesystem. Treat uploads here as a way to try a photo live;
 * commit the file (or re-upload after deploy) for it to survive a rebuild.
 */
export const uploadPhoto = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }): Promise<PhotoInfo> => {
    const file = data.get("file");
    if (!(file instanceof File)) throw new Error("No file in upload");
    const ext = path.extname(file.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) throw new Error(`Unsupported file type: ${ext}`);

    const base = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "photo";
    const dir = imagesDir();
    await mkdir(dir, { recursive: true });

    // Never overwrite: suffix -2, -3, ... until the name is free.
    let name = `${base}${ext}`;
    let n = 2;
    while (
      await stat(path.join(dir, name))
        .then(() => true)
        .catch(() => false)
    ) {
      name = `${base}-${n}${ext}`;
      n += 1;
    }

    assertSafeFilename(name);
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, name), bytes);
    return { name, size: bytes.byteLength };
  });

/** Delete a photo from `public/images`. Same on-disk caveat as `uploadPhoto`. */
export const deletePhoto = createServerFn({ method: "POST" })
  .validator((name: string) => name)
  .handler(async ({ data: name }): Promise<void> => {
    assertSafeFilename(name);
    await unlink(path.join(imagesDir(), name)).catch((err) => {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    });
  });
