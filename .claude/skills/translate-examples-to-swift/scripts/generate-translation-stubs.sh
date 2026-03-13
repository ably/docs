#!/bin/bash
#
# generate-translation-stubs.sh - Generate stub translation JSONs from verification data
#
# For verify-only mode: when verification JSONs exist but translation JSONs don't
# (e.g. re-verification of existing translations, manual edits, previous sessions).
#
# This reads each file in swift-translations/verifications/ and generates a
# corresponding file in swift-translations/translations/ with stub metadata.
# Existing translation files are skipped (safe to run when some translations exist).
#
# USAGE
#   ./generate-translation-stubs.sh [OUTPUT_DIR]
#
# ARGUMENTS
#   OUTPUT_DIR  Directory containing verifications/ (default: swift-translations)
#
# OUTPUT
#   {OUTPUT_DIR}/translations/{filename}.json - One stub per verification file
#
# EXIT CODES
#   0  Success
#   1  Error (missing files, validation failure, etc.)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="${1:-swift-translations}"

VERIFICATIONS_DIR="$OUTPUT_DIR/verifications"
TRANSLATIONS_DIR="$OUTPUT_DIR/translations"

TRANSLATION_SCHEMA="$SKILL_DIR/schemas/translation.schema.json"

# Check verifications directory exists
if [[ ! -d "$VERIFICATIONS_DIR" ]]; then
    echo "Error: Verifications directory not found: $VERIFICATIONS_DIR" >&2
    exit 1
fi

VERIFICATION_COUNT=$(find "$VERIFICATIONS_DIR" -name '*.json' 2>/dev/null | wc -l | tr -d ' ')
if [[ "$VERIFICATION_COUNT" -eq 0 ]]; then
    echo "Error: No verification JSON files found in $VERIFICATIONS_DIR" >&2
    exit 1
fi

# Ensure translations directory exists
mkdir -p "$TRANSLATIONS_DIR"

echo "Generating translation stubs from $VERIFICATION_COUNT verification file(s)..." >&2

# Use node to read verification JSONs and generate translation stubs
node -e '
const fs = require("fs");
const path = require("path");

const verificationsDir = process.argv[1];
const translationsDir = process.argv[2];

const verificationFiles = fs.readdirSync(verificationsDir).filter(f => f.endsWith(".json"));

let generated = 0;
let skipped = 0;

for (const file of verificationFiles) {
    const translationPath = path.join(translationsDir, file);

    // Skip if translation already exists
    if (fs.existsSync(translationPath)) {
        console.error(`  Skip (exists): ${file}`);
        skipped++;
        continue;
    }

    const verification = JSON.parse(fs.readFileSync(path.join(verificationsDir, file), "utf8"));

    const stub = {
        file: verification.file,
        translatedAt: new Date().toISOString(),
        examples: verification.examples.map(ex => ({
            id: ex.id,
            lineNumber: ex.lineNumber,
            notes: [
                {
                    type: "info",
                    message: "Verify-only mode — no translation was performed. This stub was generated from verification data."
                }
            ]
        }))
    };

    fs.writeFileSync(translationPath, JSON.stringify(stub, null, 2) + "\n");
    console.error(`  Generated: ${file}`);
    generated++;
}

console.error("");
console.error(`Done: ${generated} generated, ${skipped} skipped (already existed)`);

if (generated === 0 && skipped > 0) {
    console.error("All verification files already have matching translations.");
}
' "$VERIFICATIONS_DIR" "$TRANSLATIONS_DIR"

# Validate generated stubs against schema
echo "" >&2
echo "Validating generated stubs against translation schema..." >&2

VALIDATION_FAILED=0
for f in "$TRANSLATIONS_DIR"/*.json; do
    if ! npx ajv-cli validate -s "$TRANSLATION_SCHEMA" -d "$f" >/dev/null 2>&1; then
        echo "  FAIL: $(basename "$f")" >&2
        VALIDATION_FAILED=1
    fi
done

if [[ "$VALIDATION_FAILED" -eq 1 ]]; then
    echo "Error: Some generated stubs failed schema validation" >&2
    exit 1
fi

echo "All translation files pass schema validation." >&2
