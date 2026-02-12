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

// Build lookup map of verifications by file, then by example ID
const verificationsByFile = new Map();
verifications.forEach(v => {
    const byId = new Map();
    v.data.examples.forEach(ex => {
        byId.set(ex.id, ex);
    });
    verificationsByFile.set(v.data.file, byId);
});

// Merge by iterating over translations (ensures every translation is accounted for)
let validationErrors = [];
let totalExamples = 0;
let compilationPassed = 0;
let compilationFailed = 0;

const files = translations.map(t => {
    const verificationMap = verificationsByFile.get(t.data.file);
    if (!verificationMap) {
        validationErrors.push(`Translation for ${t.data.file} has no matching verification file`);
        return null;
    }

    const examples = t.data.examples.map(translationEx => {
        const verificationEx = verificationMap.get(translationEx.id);
        if (!verificationEx) {
            validationErrors.push(`Translation ID "${translationEx.id}" in ${t.data.file} was not verified`);
            return null;
        }

        totalExamples++;
        if (verificationEx.compilation.status === "pass") {
            compilationPassed++;
        } else {
            compilationFailed++;
        }

        return {
            id: translationEx.id,
            lineNumber: verificationEx.lineNumber,
            original: verificationEx.original,
            translation: verificationEx.translation,
            harness: verificationEx.harness,
            translationNotes: translationEx.notes || [],
            verification: {
                compilation: verificationEx.compilation,
                faithfulness: verificationEx.faithfulness
            }
        };
    }).filter(Boolean);

    // Check for extra verifications not in translation
    verificationMap.forEach((_, id) => {
        const inTranslation = t.data.examples.some(ex => ex.id === id);
        if (!inTranslation) {
            validationErrors.push(`Verification ID "${id}" in ${t.data.file} has no matching translation`);
        }
    });

    return {
        path: t.data.file,
        examples
    };
}).filter(Boolean);

if (validationErrors.length > 0) {
    console.error("Validation errors:");
    validationErrors.forEach(e => console.error("  - " + e));
    process.exit(1);
}

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
