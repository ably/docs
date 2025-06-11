#!/usr/bin/env bash

set -euo pipefail
# set -x # uncomment to help debugging

#
# This script verifies that the content request bearer tokens work as expected
#

# Make sure basic auth is disabled for these tests as it will interfere with the content request auth tokens
export ENABLE_BASIC_AUTH=false

# First we define some utility functions to help us in the test

wait_for_nginx_pid_file() {
    local operation=$1  # "start" or "stop"
    local count=0

    while ( [ "$operation" = "start" ] && [ ! -f /tmp/nginx.pid ] ) || \
          ( [ "$operation" = "stop" ] && [ -f /tmp/nginx.pid ] ); do
        # nginx operations are quick so we can be impatient here
        sleep 0.1
        count=$((count + 1))
        if [ $count -ge 100 ]; then  # 0.1s * 100 = 10s
            echo "Error: Timeout waiting for nginx to $operation"
            exit 1
        fi
    done
}

start_nginx() {
    # Start nginx in the background
    ./bin/start-nginx &

    # Wait for nginx to start successfully (pid file is created)
    wait_for_nginx_pid_file "start"

    # Get the PID from the nginx.pid file
    NGINX_PID=$(cat /tmp/nginx.pid)

    # Check if nginx is still running
    if ! kill -0 $NGINX_PID 2>/dev/null; then
        echo "Error: Failed to start nginx"
        exit 1
    fi
}

stop_nginx() {
    # Read the PID from the file
    if [ -f /tmp/nginx.pid ]; then
        NGINX_PID=$(cat /tmp/nginx.pid)
        # Kill nginx if it's still running
        if kill -0 $NGINX_PID 2>/dev/null; then
            kill $NGINX_PID
        fi

        # Wait for nginx to stop (pid file to be removed)
        wait_for_nginx_pid_file "stop"
    fi
}

# Set up trap to stop nginx on script exit or failure
trap stop_nginx EXIT

# Function to run a single test case
run_test() {
    local path="$1"
    local expected_status="$2"
    local expected_content_type="$3"
    local expected_redirect_url="${4:-}"
    local auth_token="${5:-}"
    local test_name="${6:-Test case}"

    echo "--------------------------------"
    echo "Running test: $test_name"
    echo

    # Start nginx
    start_nginx

    # Prepare curl command
    local curl_cmd="curl --silent --output /dev/null --write-out %{http_code}|%{content_type}|%{redirect_url}"

    # Add auth token if provided
    if [ -n "$auth_token" ]; then
        curl_cmd="$curl_cmd --oauth2-bearer $auth_token"
    fi

    # Make the request
    local response=$($curl_cmd "http://localhost:${PORT}${path}")
    local status_code=$(echo "$response" | cut -d'|' -f1)
    local content_type=$(echo "$response" | cut -d'|' -f2)
    local redirect_url=$(echo "$response" | cut -d'|' -f3)

    # Verify status code
    if [ "$status_code" != "$expected_status" ]; then
        echo "Expected status code $expected_status, got $status_code"
        exit 1
    fi

    # Verify content type
    if [[ ! $content_type =~ $expected_content_type ]]; then
        echo "Expected Content-Type to contain $expected_content_type, got $content_type"
        exit 1
    fi

    # Verify redirect URL if expected
    if [ -n "$expected_redirect_url" ] && [[ ! $redirect_url =~ $expected_redirect_url ]]; then
        echo "Expected redirect URL to contain $expected_redirect_url, got $redirect_url"
        exit 1
    fi

    echo "OK: $test_name passed"
    stop_nginx
    echo
}

export PORT=4001

# Example usage of the test function:
# run_test "/" "200" "text/html" "" "" "Root path without auth"
# run_test "/" "404" "text/html" "" "" "Root path with auth tokens but no auth"
# run_test "/" "301" "text/html" "http://www.example.com/" "" "Root path with canonical host"
# run_test "/" "200" "text/html" "" "foo" "Root path with auth"

# 1. Verify that things work as normal when the tokens aren't set
run_test "/" "200" "text/html" "" "" "Root path without auth tokens"

# 2. Verify that things work as expected when the tokens are set
export CONTENT_REQUEST_AUTH_TOKENS=foo,bar
run_test "/" "404" "text/html" "" "" "Root path with auth tokens but no auth"

# 3. Verify that things work as expected when the tokens are set and the canonical host is set
export CONTENT_REQUEST_CANONICAL_HOST=www.example.com
run_test "/" "301" "text/html" "http://www.example.com/" "" "Root path with canonical host"

# 4. Verify that things work as expected when the tokens are set and the canonical host is set and the request is authenticated
run_test "/" "200" "text/html" "" "foo" "Root path with auth token"

# 5. Verify that things work as expected when the tokens are set and the canonical host is set and the request is authenticated and the request is for a .html file
run_test "/index.html" "200" "text/html" "" "foo" "index.html with auth token"

# 6. Verify that things work as expected when the tokens are set and the canonical host is set and the request is authenticated and the request is for a .html file and the request is for a path that doesn't exist
run_test "/index.html" "301" "text/html" "http://www.example.com/" "" "index.html without auth token"

# 7. Verify that things work as expected when the tokens are set and the canonical host is set and the request is authenticated and the request is for a .html file and the request is for a path that doesn't exist
run_test "/does-not-exist.html" "404" "text/html" "" "foo" "Does not exist with auth token"

# 8. Verify assets requests work without auth
FIRST_ASSET=$(find public -name "*.jpg" -type f | head -n1 | sed 's|^public/||')
run_test "/${FIRST_ASSET}" "200" "image/jpeg" "" "" "JPEG without auth"

# 9. Verify JSON requests work without auth
run_test "/page-data/app-data.json" "200" "application/json" "" "" "Page data without auth"

# Clean up environment variables
unset CONTENT_REQUEST_AUTH_TOKENS
unset CONTENT_REQUEST_CANONICAL_HOST
