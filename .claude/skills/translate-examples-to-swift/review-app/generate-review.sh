#!/bin/bash
#
# generate-review.sh - Generates a human-reviewable HTML file from translation data
#
# This script combines the review-app.html template with a JSON data file containing
# translation results to produce a standalone HTML file that can be opened in a browser
# for human review of Swift translations.
#
# USAGE
#   ./generate-review.sh [DATA_FILE] [OUTPUT_FILE]
#
# ARGUMENTS
#   DATA_FILE    Path to JSON file containing translation data (default: example-data.json)
#   OUTPUT_FILE  Path for generated HTML file (default: stdout)
#
# EXAMPLES
#   # Generate review file using example data, output to stdout
#   ./generate-review.sh
#
#   # Generate review file from specific data, output to stdout
#   ./generate-review.sh /path/to/translation-data.json
#
#   # Generate review file and save to a specific location
#   ./generate-review.sh /path/to/translation-data.json /tmp/review.html
#
#   # Generate and immediately open in browser
#   ./generate-review.sh data.json /tmp/review.html && open /tmp/review.html
#
# JSON DATA FORMAT
#   The data file must conform to the translation data schema. See example-data.json
#   for the expected structure. Key fields:
#
#   {
#     "version": "1.0",
#     "generatedAt": "2026-01-30T10:30:00Z",
#     "summary": {
#       "filesProcessed": 2,
#       "examplesTranslated": 3,
#       "compilationPassed": 2,
#       "compilationFailed": 1
#     },
#     "files": [
#       {
#         "path": "src/pages/docs/example.mdx",
#         "examples": [
#           {
#             "id": "unique-id",
#             "lineNumber": 45,
#             "original": { "language": "javascript", "code": "..." },
#             "translation": { "language": "swift", "code": "..." },
#             "harness": { "functionSignature": "...", "fullContext": "..." },
#             "translationNotes": [ { "type": "decision|deviation|info|warning", "message": "..." } ],
#             "verification": {
#               "compilation": { "status": "pass|fail", "errorMessage": "..." },
#               "faithfulness": { "rating": "faithful|minor_differences|significant_deviation", "notes": "..." }
#             }
#           }
#         ]
#       }
#     ]
#   }
#
# OUTPUT
#   A standalone HTML file that displays:
#   - Side-by-side JavaScript/Swift code comparison
#   - Translation notes and decisions
#   - Verification results (compilation status, faithfulness assessment)
#   - Interactive review controls (approve/flag/skip with comments)
#   - Export functionality for review summary
#
# FILES
#   review-app.html   - HTML template (source of truth)
#   example-data.json - Sample data file demonstrating expected format
#
# EXIT CODES
#   0  Success
#   1  Error (template or data file not found)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE="$SCRIPT_DIR/review-app.html"
DATA_FILE="${1:-$SCRIPT_DIR/example-data.json}"
OUTPUT="${2:-/dev/stdout}"

if [[ ! -f "$TEMPLATE" ]]; then
    echo "Error: Template not found at $TEMPLATE" >&2
    exit 1
fi

if [[ ! -f "$DATA_FILE" ]]; then
    echo "Error: Data file not found at $DATA_FILE" >&2
    exit 1
fi

# Validate JSON against schema
SCHEMA="$SCRIPT_DIR/../schemas/consolidated.schema.json"
if ! npx ajv-cli validate -s "$SCHEMA" -d "$DATA_FILE" >/dev/null 2>&1; then
    echo "Error: Data file does not conform to schema" >&2
    echo "Run: npx ajv-cli validate -s $SCHEMA -d $DATA_FILE" >&2
    exit 1
fi

# Use awk to handle multi-line JSON replacement
awk -v data_file="$DATA_FILE" '
/<!-- TRANSLATION_DATA_PLACEHOLDER -->/ {
    print "<script>const TRANSLATION_DATA = "
    while ((getline line < data_file) > 0) print line
    close(data_file)
    print ";</script>"
    next
}
{ print }
' "$TEMPLATE" > "$OUTPUT"

if [[ "$OUTPUT" != "/dev/stdout" ]]; then
    echo "Generated: $OUTPUT" >&2
fi
