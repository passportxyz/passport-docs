// Compares the credential table on the Credential Map and Weights page
// with the weights production uses. Run: node scripts/check-weights.mjs
//
// Exit 1: the table disagrees with production.
// Exit 0: the table matches, or the API could not be reached (warning only).

import { readFileSync } from "node:fs";

const PAGE = "content/building-with-passport/stamps/major-concepts/credential-map-and-weights.mdx";
const API = "https://api.passport.xyz/ceramic-cache/weights";
const TOLERANCE = 0.0005; // the table shows 3 decimals

// Retired Stamps that still carry a weight in the scorer. They stay out of the
// table on purpose. The Stamp Changelog on the page records each removal.
const RETIRED = new Set([
  "Brightid",
  "CivicCaptchaPass",
  "CivicLivenessPass",
  "CivicUniquenessPass",
  "IdenaState#Human",
  "IdenaState#Newbie",
  "IdenaState#Verified",
  "TrustaLabs",
  "ZkSyncEra",
  "zkSyncScore#5",
  "zkSyncScore#20",
  "zkSyncScore#50",
]);

function readTable() {
  const text = readFileSync(PAGE, "utf8").split("## Stamp Changelog")[0];
  const table = new Map();
  for (const line of text.split("\n")) {
    const cells = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
    if (cells.length === 3 && /^\d+\.\d+$/.test(cells[2]) && cells[1] !== "**total**") {
      table.set(cells[1], Number(cells[2]));
    }
  }
  return table;
}

let live;
try {
  const res = await fetch(API, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  live = Object.fromEntries(Object.entries(await res.json()).map(([k, v]) => [k, Number(v)]));
} catch (err) {
  console.warn(`WARNING: could not read ${API} (${err.message}). Check skipped.`);
  process.exit(0);
}

const table = readTable();
const problems = [];

for (const [name, weight] of table) {
  if (!(name in live)) problems.push(`In the table, not in production: ${name}`);
  else if (Math.abs(live[name] - weight) > TOLERANCE)
    problems.push(`Weight differs for ${name}: table ${weight}, production ${live[name]}`);
}
for (const [name, weight] of Object.entries(live)) {
  if (weight > 0 && !table.has(name) && !RETIRED.has(name))
    problems.push(`In production, not in the table: ${name} (${weight}). Add it, or add it to RETIRED.`);
}

if (problems.length) {
  console.error(`${PAGE} disagrees with ${API}:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`OK: ${table.size} credentials match production.`);
