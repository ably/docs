#!/bin/bash

#
# A utility script to assert that all CSS, JS, JSON, and SVG files have corresponding .gz compressed versions
#
# Usage: assert-compressed.sh
#

# Find all files that should be compressed
FILES=$(find public -type f \( -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.svg" \))
ORIGINAL_COUNT=$(echo "$FILES" | wc -l)

# Check each file for a corresponding .gz version
MISSING_FILES=()
for file in $FILES; do
  if [ ! -f "${file}.gz" ]; then
    MISSING_FILES+=("$file")
  fi
done

MISSING_COUNT=${#MISSING_FILES[@]}

if [ $MISSING_COUNT -gt 0 ]; then
  echo "Error: Found ${MISSING_COUNT} files without corresponding .gz versions"
  echo "Missing compressed versions for:"
  for file in "${MISSING_FILES[@]}"; do
    echo "  $file"
  done
  exit 1
fi

echo "OK: All ${ORIGINAL_COUNT} files have corresponding .gz compressed versions"