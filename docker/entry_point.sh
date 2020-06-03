#!/bin/bash

set -e

if [ ! -f /docs/app/Rules ]; then
  echo "Error: This docker container does not have the app mounted in /docs/app. Please use the `docker-compose` commands"
  exit 1
fi

# Ensure the dependencies built for this docs repo are copied across
# and overwrite existing dependencies as subtle changes like installed Ruby version
# will cause bundler to raise an warning and exit due to mismatch
if ! cmp -s /docs/dependencies/Gemfile /docs/app/Gemfile; then
  echo "The Gemfile built for this container does not match the current Gemfile i.e. they have changed";
  echo "You must rebuild the container with: $ ./docker-run build"
  exit 2
fi

exec $@
