ARG RUBY_VERSION

FROM ruby:${RUBY_VERSION}-alpine
MAINTAINER Ably <support@ably.com>

ENV BUILD_PACKAGES bash curl-dev build-base make gcc libc-dev ncurses-dev

# Update and install all of the required packages.
# At the end, remove the apk cache
RUN apk update && \
    apk upgrade && \
    apk add $BUILD_PACKAGES

# Ensure Ruby Gem lib dependencies are met
RUN apk add libffi-dev libxml2-dev libxslt-dev git
# Ensure Nokogiri builds: See https://github.com/cybercode/alpine-ruby
RUN bundle config build.nokogiri --use-system-libraries

# Clean up APK cache
RUN rm -rf /var/cache/apk/*

RUN mkdir -p /docs/dependencies
WORKDIR /docs/dependencies

# Set up Gems
COPY Gemfile /docs/dependencies
COPY Gemfile.lock /docs/dependencies
COPY .ruby-version /docs/dependencies

# Ensure all bundle commands use this Gemfile
ENV BUNDLE_GEMFILE=/docs/dependencies/Gemfile

RUN bundle install

COPY docker/entry_point.sh /docker_entry.sh
RUN chmod +x /docker_entry.sh

EXPOSE 4000
VOLUME /docs/app

WORKDIR /docs/app

ENTRYPOINT ["/docker_entry.sh"]
