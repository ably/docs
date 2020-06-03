FROM alpine:3.12.0
MAINTAINER Ably <support@ably.io>

ENV BUILD_PACKAGES bash curl-dev ruby-dev build-base make gcc libc-dev
ENV RUBY_PACKAGES ruby ruby-io-console ruby-bundler

# Update and install all of the required packages.
# At the end, remove the apk cache
RUN apk update && \
    apk upgrade && \
    apk add $BUILD_PACKAGES && \
    apk add $RUBY_PACKAGES

# Ensure Ruby Gem lib dependencies are met
RUN apk add libffi-dev libxml2-dev libxslt-dev git
# Ensure Nokogiri builds: See https://github.com/cybercode/alpine-ruby
RUN bundle config build.nokogiri --use-system-libraries
# Add Ruby web server
RUN apk add ruby-webrick
# Support byebug and Guard
RUN apk add ncurses-dev ruby-irb

# Clean up APK cache
RUN rm -rf /var/cache/apk/*

RUN mkdir -p /docs/dependencies
WORKDIR /docs/dependencies

# Set up Gems
COPY Gemfile /docs/dependencies
COPY Gemfile.lock /docs/dependencies
RUN echo "$(ruby -e 'puts RUBY_VERSION')" > /docs/dependencies/.ruby-version

# Silence root warning 'Don't run Bundler as root' -> https://github.com/docker-library/rails/issues/10
RUN bundle config --global silence_root_warning 1
RUN bundle install

# Ensure all bundle commands use this Gemfile
ENV BUNDLE_GEMFILE=/docs/dependencies/Gemfile

COPY docker/entry_point.sh /docker_entry.sh
RUN chmod +x /docker_entry.sh

EXPOSE 4000
VOLUME /docs/app

WORKDIR /docs/app

ENTRYPOINT ["/docker_entry.sh"]


