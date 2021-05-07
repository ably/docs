source 'http://rubygems.org/'

ruby File.read(File.expand_path("../.ruby-version", __FILE__)).strip

gem 'nanoc', '~>4.11'
gem 'nanoc-redirector'
gem 'RedCloth'
gem 'kramdown'
gem 'sass'
gem 'gist'
gem 'jsbin-client'

# Web server for `nanoc view`
gem 'webrick'

gem 'adsf'

# Guard for automatic rebuilding of static site
group :nanoc do
  gem 'guard-nanoc'
end

# Deploy tasks
gem 'rake'
gem 'git'

# Allow URLs to be copied to the clipboard
gem 'clipboard'

# Need under Alpine Docker
gem 'json'

# Debugging
gem 'pry'
gem 'pry-byebug'

# Content checking
gem 'nokogiri'

group :development, :test do
  gem 'rspec', '~> 3.10'
end
