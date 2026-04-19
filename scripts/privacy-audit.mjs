#!/usr/bin/env node
/**
 * Privacy audit — CI gate for aliarbab.com.
 *
 * Recursively scans the built `.next` output + the `public/` directory
 * for a forbidden-token list. Fails the process with exit code 1 on
 * ANY hit so CI blocks the deploy.
 *
 * What we block:
 *   - Specific college/university names (MIT, Harvard, Stanford, etc.)
 *   - Application-timeline language ("early action", "regular action",
 *     "admissions committee")
 *   - City names + country that could geo-identify
 *   - Timezone abbreviations
 *   - Ali's raw Gmail address
 *
 * Usage:
 *   pnpm build && node scripts/privacy-audit.mjs
 *
 * Whitelist: this script itself contains the forbidden tokens by
 * necessity. We scan only built/public output, not the repo source.
 */

import { readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());

// Directories to scan (relative to repo root)
const SCAN_DIRS = [".next/server", ".next/static", "public"];

// File extensions we care about
const TEXT_EXTS = new Set([
  ".html",
  ".js",
  ".mjs",
  ".cjs",
  ".css",
  ".txt",
  ".md",
  ".json",
  ".xml",
  ".svg",
  ".rsc",
  ".ts",
  ".tsx",
  ".mdx",
  ".map",
]);

// Forbidden tokens — each row is { pattern, reason }
// Patterns are matched case-insensitively unless they include non-letter chars.
const FORBIDDEN = [
  // Specific colleges — add more as needed, but NEVER remove without explicit Ali approval.
  { pattern: /\bMIT\b/g, reason: "specific college (MIT)" },
  { pattern: /\bHarvard\b/gi, reason: "specific college (Harvard)" },
  { pattern: /\bStanford\b/gi, reason: "specific college (Stanford)" },
  { pattern: /\bPrinceton\b/gi, reason: "specific college (Princeton)" },
  { pattern: /\bYale\b/gi, reason: "specific college (Yale)" },
  { pattern: /\bColumbia University\b/gi, reason: "specific college (Columbia)" },
  { pattern: /\bCaltech\b/gi, reason: "specific college (Caltech)" },

  // Application timeline language
  { pattern: /\bEarly Action\b/gi, reason: "application-timeline language" },
  { pattern: /\bRegular Action\b/gi, reason: "application-timeline language" },
  { pattern: /\bearly decision\b/gi, reason: "application-timeline language" },
  { pattern: /\badmissions committee\b/gi, reason: "application-timeline language" },
  { pattern: /\bcommon app\b/gi, reason: "application-timeline language" },

  // Geo identifiers — any city or school that could identify Ali
  { pattern: /\bNew Delhi\b/gi, reason: "geo identifier" },
  { pattern: /\bDelhi\b/gi, reason: "geo identifier" },
  { pattern: /\bMumbai\b/gi, reason: "geo identifier" },
  { pattern: /\bBangalore\b/gi, reason: "geo identifier" },

  // Timezone strings — could infer location
  { pattern: /\bIST\b(?!-|_)/g, reason: "timezone abbreviation" },
  { pattern: /\bPST\b(?!-|_)/g, reason: "timezone abbreviation" },
  { pattern: /\bEST\b(?!-|_)/g, reason: "timezone abbreviation" },

  // Raw Gmail — never publish
  { pattern: /foxman1544minecraftthankmelatr/gi, reason: "raw Gmail address" },
];

// Files we intentionally skip (CSS color names that collide with words, etc.)
const SKIP_FILES = new Set([]);

let violations = 0;

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(p);
    } else if (entry.isFile()) {
      await scanFile(p);
    }
  }
}

async function scanFile(path) {
  const rel = relative(ROOT, path);
  if (SKIP_FILES.has(rel)) return;

  const ext = extname(path).toLowerCase();
  if (!TEXT_EXTS.has(ext)) return;

  let size;
  try {
    size = statSync(path).size;
  } catch {
    return;
  }
  if (size > 5 * 1024 * 1024) return; // skip > 5 MB bundles (source maps etc.)

  let content;
  try {
    content = readFileSync(path, "utf8");
  } catch {
    return;
  }

  for (const { pattern, reason } of FORBIDDEN) {
    const hits = [];
    let m;
    // Clone the regex to reset lastIndex between files
    const re = new RegExp(pattern.source, pattern.flags);
    while ((m = re.exec(content)) !== null) {
      const context = content.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40);
      if (isAllowedContext(m[0], context, reason)) continue;
      hits.push({ match: m[0], context });
      if (!re.global) break;
    }
    if (hits.length > 0) {
      violations++;
      console.error(
        `\x1b[31m✗\x1b[0m ${rel}\n  ↳ forbidden (${reason}): ${hits.length} hit${hits.length === 1 ? "" : "s"}\n${hits
          .slice(0, 3)
          .map((h) => `     ${JSON.stringify(h.context.replace(/\s+/g, " "))}`)
          .join("\n")}`,
      );
    }
  }
}

/**
 * Return true if a match should be ignored as a false positive.
 * We allow:
 *   - "MIT License" / "MIT-licensed" / MIT in SPDX license headers
 *     (Next.js, Tailwind, React, etc. all include these in compiled bundles)
 *   - "Columbia University" is blocked, but plain "Columbia" in place names
 *     is not blocked here (we only block the full phrase)
 */
function isAllowedContext(match, context, reason) {
  if (reason.startsWith("specific college (MIT)")) {
    // Allow "MIT License" and SPDX-style license strings
    if (/MIT\s+License/i.test(context)) return true;
    if (/license[:=]\s*["']?MIT/i.test(context)) return true;
    if (/@license.*MIT/i.test(context)) return true;
    if (/"MIT"/.test(context) && /license/i.test(context)) return true;
    if (/MIT-licensed/i.test(context)) return true;
  }
  return false;
}

async function main() {
  console.log("🔒 Privacy audit — scanning built output...\n");

  for (const dir of SCAN_DIRS) {
    const full = join(ROOT, dir);
    try {
      statSync(full);
    } catch {
      console.log(`  (skipping ${dir} — does not exist)`);
      continue;
    }
    await walk(full);
  }

  if (violations > 0) {
    console.error(
      `\n\x1b[31m✗ Privacy audit FAILED.\x1b[0m ${violations} violation${violations === 1 ? "" : "s"} found.`,
    );
    console.error(`   See aliarbab.com's CLAUDE.md for the privacy rules.`);
    process.exit(1);
  }

  console.log("\n\x1b[32m✓ Privacy audit passed.\x1b[0m No forbidden tokens in the built output.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Audit script error:", err);
  process.exit(2);
});
