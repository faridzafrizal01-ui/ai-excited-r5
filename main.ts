// Moon Loop — make.fun ai-excited-01 entry (r8 rebuild).
//
// What this program does:
//   Copies the artwork file entry.png (the "Moon Loop" painting sitting in
//   this same directory) into the grader's output directory, as
//   $MAKEFUN_OUTPUT_DIR/entry.png. The output directory defaults to
//   /output when MAKEFUN_OUTPUT_DIR is not set.
//
// What it deliberately does NOT do:
//   It never opens, decodes, resizes, or re-encodes the image. The file is
//   copied byte for byte, so the output of run N is always identical to the
//   output of run N+1 — the grader can re-run this program and get the
//   exact same bytes every time.
//
// Local smoke test:
//   rm -rf out out2
//   mkdir -p out out2
//   MAKEFUN_OUTPUT_DIR=out  node main.ts
//   MAKEFUN_OUTPUT_DIR=out2 node main.ts
//   sha256sum out/entry.png out2/entry.png   # the two hashes must match

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const artwork = resolve(here, "entry.png");

if (!existsSync(artwork)) {
  throw new Error(`artwork not found next to main.ts: ${artwork}`);
}

const configuredDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim();
const outDir = resolve(configuredDir === "" ? "/output" : configuredDir);
const outFile = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(artwork, outFile);

// Cheap integrity check: the delivered copy must be the same size as the
// source, otherwise something went wrong mid-write and we fail loudly.
const sourceSize = statSync(artwork).size;
const copiedSize = statSync(outFile).size;
if (sourceSize !== copiedSize) {
  throw new Error(
    `entry.png copy is incomplete: wrote ${copiedSize} of ${sourceSize} bytes to ${outFile}`,
  );
}
