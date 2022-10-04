# Originally sourced from https://github.com/chriseppstein/chriseppstein.github.com/blob/source/Rakefile

require 'rubygems'
require 'bundler/setup'

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

desc "Watch the site and regenerate when it changes"
task :watch do
  `nanoc watch`
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
