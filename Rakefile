# Originally sourced from https://github.com/chriseppstein/chriseppstein.github.com/blob/source/Rakefile

require 'rubygems'
require 'bundler/setup'
require 'fog'

require 'nanoc3/tasks'
require File.join(__FILE__, '../config/config')

def ok_failed(condition)
  if (condition)
    puts "OK"
  else
    puts "FAILED"
  end
end

# Allows a few small failures
# With Git, index.lock locks can cause intermittent failures when using
# multiple Git clients
def attempt(attempts = 0)
  yield
rescue StandardError => e
  attempts += 1
  if attempts < 3
    sleep 0.1
    retry
  end
  raise e
end

port = "4000"
site = "output"
config_folder = "config"
readme = "README.md"

desc "remove files in output directory"
task :clean do
  puts "Removing output..."
  Dir["#{site}/*"].each { |f| rm_rf(f) }
end

desc "generate website in output directory"
task :generate => :clean do
  puts "Generating website..."
  system "nanoc co"
end

desc "build and commit the website in the master branch"
task :build => :generate_all do
  readme_content = File.open(readme).read if File.exists?(readme) # load readme if it exists

  require 'git'
  repo = Git.open('.')
  repo.branch("master").checkout
  (Dir["*"] - [site, config_folder]).each { |f| rm_rf(f) }

  mv config_folder, ".#{config_folder}" # hide config folder as we need to retain config files not committed in git

  Dir["#{site}/*"].each { |f| mv(f, ".") }

  if readme_content
    File.open(readme, 'w') do |file|
      file.write readme_content
    end
    puts "Copied #{readme}"
  end

  rm_rf(site)

  # Git lock still existed for some reason, pause briefly to allow lock to be released
  sleep 0.5

  Dir["**/*"].each do |file|
    attempt { repo.add(file) }
  end

  repo.status.deleted.each do |file, s|
    begin
      attempt { repo.remove(file) }
    rescue Git::GitExecuteError => e
      puts "Warning: #{e.message}"
    end
  end
  message = ENV["MESSAGE"] || "Site updated at #{Time.now.utc}"

  unless system('git status | grep "nothing to commit"')
    attempt { repo.commit(message) }
  end

  rm_rf config_folder
  mv ".#{config_folder}", config_folder # restore config folder

  repo.branch("source").checkout
end

desc "generate and deploy website to S3 and remote 'origin' repository"
task :deploy => :build do
  config = Ably::Config.new

  s3 = Fog::Storage.new(
    host: config.s3_host,
    :provider => :aws,
    aws_access_key_id: config.aws_access_key_id,
    aws_secret_access_key: config.aws_secret_access_key,
    path_style: true
  )
  s3 = s3.directories.get(config.s3_bucket)
  if s3.nil?
    puts "Error! Could not connect to S3 repository, aborting"
    exit 1
  end

  # as we are publishing this to S3 i.e. the public website, the origin repo must match
  puts "\nNow pushing master and source branches up to the origin remote (Github)"
  system "git push origin master"
  system "git push origin source"
  repo = Git.open('.')
  repo.branch("master").checkout

  files = Dir.glob('**/*.{html,js,css,png,jpg,jpeg,pdf,woff,ico}')
  puts "Uploading #{files.count} file(s) to S3 bucket '#{config.s3_bucket}'"
  files.each do |file_path|
    puts file_path
    s3.files.create(
      :key    => file_path,
      :body   => File.open(file_path)
    )
    print '.'
  end

  puts "\nFinished uploading #{files.count} files to S3"
  puts "Site is now up at http://#{config.s3_bucket}/"
  repo.branch("source").checkout
end

desc "start up an instance of server on the output files"
task :serve => 'serve:start'

namespace :serve do
  desc "start up an instance of serve on the output files"
  task :start => :stop do
    cd "#{site}" do
      print "Starting serve..."
      ok_failed system("nanoc view #{port} > /dev/null 2>&1 &")
      puts "Server up at http://localhost:#{port}"
    end
  end

  desc "stop all instances of serve"
  task :stop do
    pid = `ps auxw | awk '/nanoc view #{port}/ { print $2 }'`.strip
    if pid.empty?
      puts "Serve is not running"
    else
      print "Stoping serve..."
      ok_failed system("kill -9 #{pid}")
    end
  end
end

desc "preview the site in a web browser"
multitask :preview => [:generate, :start_serve] do
  system "open http://localhost:#{port}/"
end

def rebuild_site(relative)
  puts ">>> Change Detected to: #{relative} <<<"
  Rake::Task["generate"].execute
  puts '>>> Update Complete <<<'
end

desc "Watch the site and regenerate when it changes"
task :watch do
  `nanoc watch`
end

def departialize(target)
  if (bn = File.basename(target))[0..0] == "_"
    target = file.join(file.dirname(target), bn[1..-1])
  end
  target
end

desc "Build an XML sitemap of all html files."
task :sitemap => :generate do
  html_files = FileList.new("#{site}/**/*.html").map{|f| f[(site.size)..-1]}.map do |f|
    if f =~ /index.html$/
      f[0..(-("index.html".size + 1))]
    else
      f
    end
  end.sort_by{|f| f.size}
  open("#{site}/sitemap.xml", 'w') do |sitemap|
    sitemap.puts %Q{<?xml version="1.0" encoding="UTF-8"?>}
    sitemap.puts %Q{<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">}
    html_files.each do |f|
      priority = case f
      when %r{^/$}
        1.0
      when %r{^/blog}
        0.9
      when %r{^/highlighted/$}
        0.7
      else
        0.8
      end
      sitemap.puts %Q{  <url>}
      sitemap.puts %Q{    <loc>http://ably.github.com#{f}</loc>}
      sitemap.puts %Q{    <changefreq>weekly</changefreq>}
      sitemap.puts %Q{    <priority>#{priority}</priority>}
      sitemap.puts %Q{  </url>}
    end
    sitemap.puts %Q{</urlset>}
    puts "Created #{site}/sitemap.xml"
  end
end

desc "Generate the whole site."
task :generate_all => [:generate, :sitemap]

task :build => :generate_all
