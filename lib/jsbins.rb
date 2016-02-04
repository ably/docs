require File.expand_path('../../config/config', __FILE__)
require 'digest/sha1'
require 'jsbin-client'

class JsBins
  YAML_PATH = 'data/jsbins.yaml' unless defined?(YAML_PATH)

  class << self
    attr_accessor :data

    def jsbin_id_from_content(content)
      data['jsbin_hash'][hash(content)]
    end

    def jsbin_id_from_path(path)
      jsbin_hash = data['jsbin_id'][path.downcase]
      data['jsbin_hash'][jsbin_hash]
    end

    def all
      data['jsbin_id'].map do |path, hash|
        bin_attributes(path, hash)
      end
    end

    def url_for(path)
      hash = data['jsbin_id'].fetch(path) { raise "Code for '#{path}' does not exist" }
      "#{jsbin_client.url_for(data.fetch('jsbin_hash').fetch(hash))}?javascript,live"
    end

    def publish_jsbin(path, content)
      parts = content.scan(/\[\-{3} (\w+) \-{3}\]\s*(.+)\s*\[\-{3} \/\1 \-{3}\]/m)
      files = {}
      Hash[*parts.flatten].each do |type, content|
        case type.downcase
        when 'javascript'
          files[:javascript] = content
        when 'css'
          files[:css] = content
        when 'html'
          files[:html] = content
        else
          raise "Unknown content type #{type}.  Please use Javascript, HTML or CSS only."
        end
      end
      raise "You must specify at least one code block such as Javascript, CSS or HTML" if files.empty?

      id = jsbin_client.create(files)['url']
      data['jsbin_id'][path] = hash(content)
      data['jsbin_hash'][hash(content)] = id

      hashes_in_use = data['jsbin_id'].invert
      data['jsbin_hash'].delete_if { |hash, id| !hashes_in_use.has_key?(hash) }

      yaml_content = YAML::dump(data)
      File.open(YAML_PATH, 'w') do |f|
        f.write(yaml_content)
      end

      {
        id: id,
        url: jsbin_url_for(id)
      }
    end

    private
      def jsbin_url_for(id)
        jsbin_client.url_for(id).gsub(/latest/, '1')
      end

      def hash(content)
        Digest::SHA1.base64digest(content)
      end

      def jsbin_client
        @jsbin_client ||= begin
          config = Ably::Config.new
          JsBinClient.new(host: config.jsbin_host, port: config.jsbin_port, ssl: config.jsbin_ssl, api_key: config.jsbin_api_key)
        end
      end

      def bin_attributes(path, hash)
        {
          path: path,
          hash: hash,
          jsbin_id: data.fetch('jsbin_hash').fetch(hash),
          jsbin_url: jsbin_url_for(data.fetch('jsbin_hash').fetch(hash))
        }
      end
  end

  @data = YAML::load(File.read(YAML_PATH))
end
