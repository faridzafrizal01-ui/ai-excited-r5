// Moon Loop — entry for make.fun ai-excited-01.
//
// The artwork for this entry is the file entry.png sitting next to this
// program: a roller-coaster loop threaded through a giant golden moon.
// This program does exactly one job — it places a byte-for-byte copy of
// that artwork at $MAKEFUN_OUTPUT_DIR/entry.png so the grader can see it.
//
// It never edits, re-encodes, or re-compresses the image, so running it
// twice always produces the identical file. Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(sourceDir, "entry.png");

if (!existsSync(sourcePath)) {
  throw new Error(`entry.png is missing next to main.ts: ${sourcePath}`);
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = resolve(targetDir, "entry.png");

mkdirSync(targetDir, { recursive: true });
const bytes = readFileSync(sourcePath);
writeFileSync(targetPath, bytes);

// Guard against a truncated write: the copy must carry every byte.
if (readFileSync(targetPath).length !== bytes.length) {
  throw new Error(`entry.png copy is incomplete: ${targetPath}`);
}
