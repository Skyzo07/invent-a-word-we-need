import * as fs from "node:fs";
import * as path from "node:path";

// Invent a Word We Need — winning entry.
// Tabnesia: tab + amnesia. The sudden forgetting of why you opened
// a new tab, staring blankly at the screen.
const ENTRY =
  "Tabnesia \u2014 The sudden forgetting of why you opened a new tab, staring blankly at the screen.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Runtime gate guard: UTF-8 text, 1-140 chars, not only whitespace.
  const len = [...ENTRY].length;
  if (len < 1 || len > 140) {
    throw new Error(`entry length ${len} is outside the 1-140 character gate`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${len} chars): ${ENTRY}`);
}

main();
