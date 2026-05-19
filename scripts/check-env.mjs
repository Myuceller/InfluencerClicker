import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const examplePath = resolve(process.cwd(), ".env.example");
const localPath = resolve(process.cwd(), ".env.local");

function parseEnvFile(path) {
  const content = readFileSync(path, "utf8");
  const entries = new Map();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    entries.set(key, value);
  }

  return entries;
}

if (!existsSync(examplePath)) {
  console.error("Missing .env.example. Cannot determine required keys.");
  process.exit(1);
}

if (!existsSync(localPath)) {
  console.error("Missing .env.local. Create it from .env.example.");
  process.exit(1);
}

const exampleEntries = parseEnvFile(examplePath);
const localEntries = parseEnvFile(localPath);
const requiredKeys = [...exampleEntries.keys()];
const missingKeys = requiredKeys.filter((key) => !localEntries.has(key));
const emptyKeys = requiredKeys.filter(
  (key) => localEntries.has(key) && localEntries.get(key) === "",
);

console.log(".env.local key check");
console.log("No environment values were printed.");

if (missingKeys.length === 0 && emptyKeys.length === 0) {
  console.log("All required keys are present and non-empty.");
  process.exit(0);
}

if (missingKeys.length > 0) {
  console.log("\nMissing keys:");
  for (const key of missingKeys) {
    console.log(`- ${key}`);
  }
}

if (emptyKeys.length > 0) {
  console.log("\nEmpty keys:");
  for (const key of emptyKeys) {
    console.log(`- ${key}`);
  }
}

process.exit(1);
