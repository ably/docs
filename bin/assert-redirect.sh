#!/bin/bash

#
# A utility script to assert redirects served up by nginx
#
# Usage: assert-redirects.sh PATH DESTINATION_URL
#
# - PATH - Local URL path, like /docs
# - DESTINATION_URL - Destination URL the direct goes to

FROM=${1}
TO=${2}

if [[ -z $FROM || -z $TO ]]; then
  echo "Usage: assert-redirects.sh PATH DESTINATION_URL"
  exit 1
fi

OUTPUT=$(curl --header "X-Forwarded-Proto: https" \
              --silent --output /dev/null \
              --write-out "%{http_code} %{redirect_url}" \
              http://localhost:3001${FROM})

CODE=$(echo $OUTPUT | cut -f 1 -d " ")
URL=$(echo $OUTPUT | cut -f 2 -d " ")

if [ ${CODE} -ne 301 ]; then
  echo "Expect a 301 status code, got '${CODE}'"
  exit 1
fi

if [ ${URL} != ${TO} ]; then
  echo "Expected ${FROM} to redirect to ${TO}, got '${URL}' instead"
  exit 1
fi

echo "OK: '${FROM}' redirects to '${TO}'"
