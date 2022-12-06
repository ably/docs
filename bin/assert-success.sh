#!/bin/bash

#
# A utility script to assert successful responses served up by nginx
#
# Usage: assert-success.sh PATH
#
# - PATH - Local URL path, like /docs

URI_PATH=${1}

if [[ -z $URI_PATH ]]; then
  echo "Usage: assert-success.sh PATH"
  exit 1
fi

CODE=$(curl --header "X-Forwarded-Proto: https" \
              --silent --output /dev/null \
              --write-out "%{http_code}" \
              http://localhost:3001${URI_PATH})

if [ ${CODE} -ne 200 ]; then
  echo "Expect a 200 status code, got '${CODE}'"
  exit 1
fi

echo "OK: '${URI_PATH}' returned a 200 status code"
