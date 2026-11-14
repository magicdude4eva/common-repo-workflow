// Replaces the "## Donations are always welcome" section in every README.md
// below the current directory with the canonical block from donations.md.
//
// Usage: node update-donations.js [path/to/donations.md]
// (defaults to donations.md next to this script)

const fs = require("fs");
const path = require("path");

const HEADING = "## Donations are always welcome";
const SKIP_DIRS = new Set([".git", "node_modules", "vendor", ".venv"]);

const blockFile = process.argv[2] || path.join(__dirname, "donations.md");
const newBlock = fs.readFileSync(blockFile, "utf8").trim();

if (!newBlock.startsWith(HEADING)) {
  console.error(`❌ ${blockFile} must start with "${HEADING}"`);
  process.exit(1);
}

// The section runs from its heading up to the next level-1/level-2 heading
// (start of line), or to the end of the file. Level-3+ headings stay inside.
const SECTION = new RegExp(
  `^${HEADING.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[ \\t]*$[\\s\\S]*?(?=^#{1,2}[ \\t]|(?![\\s\\S]))`,
  "m"
);

function updateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(SECTION);

  if (!match) {
    console.log(`ℹ️ No donation section found in ${filePath}. Skipping.`);
    return;
  }

  const atEOF = match.index + match[0].length === content.length;
  // Keep a blank line before a following heading, and a final newline at EOF
  const replacement = newBlock + (atEOF ? "\n" : "\n\n");
  const updated =
    content.slice(0, match.index) + replacement + content.slice(match.index + match[0].length);

  if (updated === content) {
    console.log(`✅ Donation block already up to date in ${filePath}`);
  } else {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✏️ Updated donation block in ${filePath}`);
  }
}

function walkAndUpdate(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkAndUpdate(fullPath);
    } else if (entry.name === "README.md") {
      updateFile(fullPath);
    }
  }
}

walkAndUpdate(".");
