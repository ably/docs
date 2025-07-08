#!/bin/bash

source "$(dirname "$0")/nginx-utils.sh"
trap stop_nginx EXIT

#
# A utility script to assert basic auth is working correctly
#
# Usage: assert-basic-auth.sh PATH
#
# - PATH - Local URL path, like /docs

URI_PATH=${1}

if [[ -z $URI_PATH ]]; then
  echo "Usage: assert-basic-auth.sh PATH"
  exit 1
fi

export ENABLE_BASIC_AUTH=true

start_nginx

# Test without credentials (should get 401)
NO_AUTH_CODE=$(curl --header "X-Forwarded-Proto: https" \
                    --silent --output /dev/null \
                    --write-out "%{http_code}" \
                    http://localhost:3001${URI_PATH})

if [ ${NO_AUTH_CODE} -ne 401 ]; then
  echo "Expected 401 status code without credentials, got '${NO_AUTH_CODE}'"
  exit 1
fi

# Test with correct credentials (should get 200)
AUTH_CODE=$(curl --header "X-Forwarded-Proto: https" \
                 --silent --output /dev/null \
                 --write-out "%{http_code}" \
                 --user preview:preview \
                 http://localhost:3001${URI_PATH})

if [ ${AUTH_CODE} -ne 200 ]; then
  echo "Expected 200 status code with correct credentials, got '${AUTH_CODE}'"
  exit 1
fi

echo "OK: Basic auth is working correctly for '${URI_PATH}'"
