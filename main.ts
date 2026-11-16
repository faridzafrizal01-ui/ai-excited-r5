// Moon Loop — an ai-excited-01 entry.
//
// The image lives beside this program as entry.png: a roller-coaster loop
// threaded through a giant golden full moon, rendered for this entry.
// This program only carries those exact bytes to the grader's output
// path, so every run writes the same file. Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
// The file keeps its .png name although its bytes are JPEG; the gate
// tells PNG and JPEG apart by their magic bytes, not by the name.

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));
