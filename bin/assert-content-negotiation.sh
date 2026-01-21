#!/bin/bash

# Content Negotiation Test Suite
# Verifies that nginx serves markdown or HTML based on Accept header

source "$(dirname "$0")/nginx-utils.sh"
trap stop_nginx EXIT

set -euo pipefail

# Test counter
TEST_COUNT=0

# Disable auth for content negotiation tests
export ENABLE_BASIC_AUTH=false
export CONTENT_REQUEST_AUTH_TOKENS=""

# Set default port if not already set
export PORT=${PORT:-3001}

# Test helper function
# Parameters:
#   $1: path - URL path to test
#   $2: accept_header - Accept header value (empty string for default)
#   $3: expected_status - Expected HTTP status code
#   $4: expected_format - "html", "markdown", or "any"
#   $5: test_name - Human-readable test description
#   $6: user_agent - Optional User-Agent string
run_test() {
  local path="$1"
  local accept_header="$2"
  local expected_status="$3"
  local expected_format="$4"
  local test_name="$5"
  local user_agent="${6:-}"

  TEST_COUNT=$((TEST_COUNT + 1))
  echo "🧪 $test_name"

  # Build curl command with optional Accept header and User-Agent
  local curl_cmd="curl --silent --header \"X-Forwarded-Proto: https\""

  if [ -n "$user_agent" ]; then
    curl_cmd="$curl_cmd --user-agent \"$user_agent\""
  fi

  if [ -n "$accept_header" ]; then
    curl_cmd="$curl_cmd --header \"Accept: $accept_header\""
  fi

  curl_cmd="$curl_cmd --write-out \"\\n%{http_code}\\n%{content_type}\""
  curl_cmd="$curl_cmd \"http://localhost:\${PORT}\${path}\""

  # Execute request and capture response + metadata
  local response
  response=$(eval "$curl_cmd")

  # Parse response components
  local body=$(echo "$response" | sed '$d' | sed '$d')
  local status=$(echo "$response" | tail -2 | head -1)
  local content_type=$(echo "$response" | tail -1)

  # Assert status code
  if [ "$status" != "$expected_status" ]; then
    echo "  ❌ Expected status $expected_status, got $status"
    exit 1
  fi

  # Verify content format
  if [ "$expected_format" = "markdown" ]; then
    # Check for markdown heading (first line should start with #)
    local first_line=$(echo "$body" | head -1)
    if ! grep -q "^#" <<< "$first_line"; then
      echo "  ❌ Expected markdown (starting with #), got: ${first_line:0:50}"
      exit 1
    fi

    # Verify Content-Type header (warning only, not fatal)
    if ! grep -q "text/markdown" <<< "$content_type"; then
      echo "  ⚠️  Warning: Content-Type is '$content_type', expected 'text/markdown'"
    fi
  elif [ "$expected_format" = "html" ]; then
    # Check for HTML doctype using here-string to avoid broken pipe
    if ! grep -q "<!DOCTYPE html>" <<< "$body"; then
      echo "  ❌ Expected HTML (with DOCTYPE), but not found"
      exit 1
    fi
  fi
  # "any" format means we don't validate content

  echo "  ✅ Passed (status: $status, format: $expected_format)"
}

# Main test suite
echo "================================"
echo "Content Negotiation Test Suite"
echo "================================"
echo

start_nginx

# Group 1: Basic Content Negotiation
echo "Group 1: Basic Content Negotiation"
echo "-----------------------------------"
run_test "/docs/channels" "" "200" "html" "Default serves HTML"
run_test "/docs/channels" "text/markdown" "200" "markdown" "Accept: text/markdown"
run_test "/docs/channels" "application/markdown" "200" "markdown" "Accept: application/markdown"
run_test "/docs/channels" "text/plain" "200" "markdown" "Accept: text/plain"
run_test "/docs/channels" "text/html" "200" "html" "Accept: text/html"
run_test "/docs/channels" "*/*" "200" "html" "Accept: */*"
echo

# Group 2: Browser Behavior
echo "Group 2: Browser Behavior"
echo "-------------------------"
run_test "/docs/channels" "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" "200" "html" "Browser Accept header"
run_test "/docs/channels" "text/html, text/markdown" "200" "html" "HTML prioritized when first"
echo

# Group 3: Direct Access
echo "Group 3: Direct Access"
echo "----------------------"
run_test "/docs/channels.md" "" "200" "markdown" "Direct .md access"
run_test "/docs/channels/index.html" "" "200" "html" "Direct index.html access"
echo

# Group 4: Path Variations
echo "Group 4: Path Variations"
echo "------------------------"
run_test "/docs/chat/connect" "text/markdown" "200" "markdown" "Non-index path"
run_test "/docs/api/realtime-sdk" "text/markdown" "200" "markdown" "Nested index path"
run_test "/docs/basics" "text/markdown" "200" "markdown" "Simple path"
echo

# Group 5: Edge Cases
echo "Group 5: Edge Cases"
echo "-------------------"
run_test "/docs/nonexistent" "" "404" "any" "404 when path missing"
run_test "/docs/nonexistent" "text/markdown" "404" "any" "404 with markdown Accept"
run_test "/llms.txt" "" "200" "any" "Non-docs paths unaffected"
echo

# Group 6: Query Parameters
echo "Group 6: Query Parameters"
echo "-------------------------"
run_test "/docs/channels?foo=bar" "" "200" "html" "Query params don't affect default HTML"
run_test "/docs/channels?foo=bar" "text/markdown" "200" "markdown" "Query params don't affect markdown negotiation"
run_test "/docs/channels?foo=bar&baz=qux" "text/markdown" "200" "markdown" "Multiple query params work correctly"
echo

echo "================================"
echo "✅ All $TEST_COUNT tests passed!"
echo "================================"

# Exit explicitly with success
exit 0
