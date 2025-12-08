#!/bin/bash

#
# A utility script to assert that the nginx redirects configuration file exists and is valid
#
# Usage: assert-nginx-redirects.sh
#

echo "Validating redirect file..."

# Check file exists
if [ ! -f config/nginx-redirects.conf ]; then
  echo "ERROR: config/nginx-redirects.conf does not exist"
  exit 1
fi
echo "✓ File exists"

# Check file is not empty
if [ ! -s config/nginx-redirects.conf ]; then
  echo "ERROR: config/nginx-redirects.conf is empty (0 bytes)"
  ls -lah config/nginx-redirects.conf
  exit 1
fi

# Count redirects (lines ending with semicolon)
REDIRECT_COUNT=$(grep -c ';$' config/nginx-redirects.conf || echo "0")
echo "✓ Found ${REDIRECT_COUNT} redirects"

echo "✓ Validation passed: ${REDIRECT_COUNT} redirects in config/nginx-redirects.conf"
