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

port = "4000"
site = "output"
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
  (Dir["*"] - [site]).each { |f| rm_rf(f) }
  Dir["#{site}/*"].each {|f| mv(f, ".")}

  if readme_content
    File.open(readme, 'w') do |file|
      file.write readme_content
    end
    puts "Copied #{readme}"
  end

  rm_rf(site)
  Dir["**/*"].each {|f| repo.add(f) }
  repo.status.deleted.each {|f, s| repo.remove(f)}
  message = ENV["MESSAGE"] || "Site updated at #{Time.now.utc}"
  repo.commit(message) unless system('git status | grep "nothing to commit"')
  repo.branch("source").checkout
end

desc "generate and deploy website to S3 and remote 'production' repository"
task :deploy => :build do
  config = Ably::Config.new

  s3 = Fog::Storage.new(host: config.s3_host, :provider => :aws, aws_access_key_id: config.aws_access_key_id, aws_secret_access_key: config.aws_secret_access_key)
  s3 = s3.directories.get(config.s3_bucket)
  if s3.nil?
    puts "Error! Could not connect to S3 repository, aborting"
    exit 1
  end

  # as we are publishing this to S3 i.e. the public website, the production repo must match
  system "git push production master"
  repo = Git.open('.')
  repo.branch("master").checkout

  files = Dir.glob('**/*.{html,js,css,png,jpg,jpeg,pdf,woff,ico}')
  puts "Uploading #{files.count} file(s) to S3 bucket '#{config.s3_bucket}'"
  files.each do |file_path|
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
      ok_failed system("serve #{port} > /dev/null 2>&1 &")
      puts "Server up at http://localhost:#{port}"
    end
  end

  desc "stop all instances of serve"
  task :stop do
    pid = `ps auxw | awk '/bin\\/serve\\ #{port}/ { print $2 }'`.strip
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
  `nanoc watch -V`
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