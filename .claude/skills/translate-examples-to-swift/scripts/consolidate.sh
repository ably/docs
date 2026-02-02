#!/bin/bash
#
# consolidate.sh - Merges translation and verification JSONs into consolidated.json
#
# This script reads all translation and verification JSON files from swift-translations/,
# merges them by file and example ID, validates against the schema, and generates
# the review HTML file.
#
# USAGE
#   ./consolidate.sh [OUTPUT_DIR]
#
# ARGUMENTS
#   OUTPUT_DIR  Directory containing translations/ and verifications/ (default: swift-translations)
#
# OUTPUT
#   {OUTPUT_DIR}/consolidated.json  - Merged data
#   {OUTPUT_DIR}/review.html        - Human review interface
#
# EXIT CODES
#   0  Success
#   1  Error (missing files, validation failure, etc.)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="${1:-swift-translations}"

TRANSLATIONS_DIR="$OUTPUT_DIR/translations"
VERIFICATIONS_DIR="$OUTPUT_DIR/verifications"
CONSOLIDATED="$OUTPUT_DIR/consolidated.json"
REVIEW_HTML="$OUTPUT_DIR/review.html"

SCHEMA="$SKILL_DIR/schemas/consolidated.schema.json"

# Check directories exist
if [[ ! -d "$TRANSLATIONS_DIR" ]]; then
    echo "Error: Translations directory not found: $TRANSLATIONS_DIR" >&2
    exit 1
fi

if [[ ! -d "$VERIFICATIONS_DIR" ]]; then
    echo "Error: Verifications directory not found: $VERIFICATIONS_DIR" >&2
    exit 1
fi

# Count files
TRANSLATION_COUNT=$(find "$TRANSLATIONS_DIR" -name '*.json' 2>/dev/null | wc -l | tr -d ' ')
VERIFICATION_COUNT=$(find "$VERIFICATIONS_DIR" -name '*.json' 2>/dev/null | wc -l | tr -d ' ')

if [[ "$TRANSLATION_COUNT" -eq 0 ]]; then
    echo "Error: No translation JSON files found in $TRANSLATIONS_DIR" >&2
    exit 1
fi

if [[ "$VERIFICATION_COUNT" -eq 0 ]]; then
    echo "Error: No verification JSON files found in $VERIFICATIONS_DIR" >&2
    exit 1
fi

echo "Found $TRANSLATION_COUNT translation(s) and $VERIFICATION_COUNT verification(s)" >&2

# Use node to merge the JSONs (more reliable than jq for complex merges)
node -e '
const fs = require("fs");
const path = require("path");

const translationsDir = process.argv[1];
const verificationsDir = process.argv[2];
const outputFile = process.argv[3];

// Read all JSON files from a directory
function readJsonFiles(dir) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    return files.map(f => ({
        filename: f.replace(".json", ""),
        data: JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))
    }));
}

const translations = readJsonFiles(translationsDir);
const verifications = readJsonFiles(verificationsDir);

// Build lookup maps
const translationsByFile = new Map();
translations.forEach(t => {
    const notesByExample = new Map();
    t.data.examples.forEach(ex => {
        notesByExample.set(ex.id, ex.notes || []);
    });
    translationsByFile.set(t.data.file, notesByExample);
});

// Merge into consolidated format
let totalExamples = 0;
let compilationPassed = 0;
let compilationFailed = 0;

const files = verifications.map(v => {
    const translationNotes = translationsByFile.get(v.data.file) || new Map();

    const examples = v.data.examples.map(ex => {
        totalExamples++;
        if (ex.compilation.status === "pass") {
            compilationPassed++;
        } else {
            compilationFailed++;
        }

        return {
            id: ex.id,
            lineNumber: ex.lineNumber,
            original: ex.original,
            translation: ex.translation,
            harness: ex.harness,
            translationNotes: translationNotes.get(ex.id) || [],
            verification: {
                compilation: ex.compilation,
                faithfulness: ex.faithfulness
            }
        };
    });

    return {
        path: v.data.file,
        examples
    };
});

const consolidated = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    summary: {
        filesProcessed: files.length,
        examplesTranslated: totalExamples,
        compilationPassed,
        compilationFailed
    },
    files
};

fs.writeFileSync(outputFile, JSON.stringify(consolidated, null, 2));
console.error(`Wrote ${outputFile}`);
console.error(`  Files: ${files.length}`);
console.error(`  Examples: ${totalExamples} (${compilationPassed} passed, ${compilationFailed} failed)`);
' "$TRANSLATIONS_DIR" "$VERIFICATIONS_DIR" "$CONSOLIDATED"

# Validate against schema
echo "Validating against schema..." >&2
if ! npx ajv-cli validate -s "$SCHEMA" -d "$CONSOLIDATED" >/dev/null 2>&1; then
    echo "Error: Consolidated JSON does not conform to schema" >&2
    echo "Run: npx ajv-cli validate -s $SCHEMA -d $CONSOLIDATED" >&2
    exit 1
fi
echo "Schema validation passed" >&2

# Generate review HTML
echo "Generating review HTML..." >&2
"$SKILL_DIR/review-app/generate-review.sh" "$CONSOLIDATED" "$REVIEW_HTML"

echo "" >&2
echo "Done! Open $REVIEW_HTML to review translations." >&2
