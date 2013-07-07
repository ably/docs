require File.expand_path('../../config/config', __FILE__)
require 'digest/sha1'
require 'jsbin-client'

class JsBins
  YAML_PATH = 'data/jsbins.yaml' unless defined?(YAML_PATH)
  DEPENDENCIES = ['//ajax.googleapis.com/ajax/libs/jquery-1.9.1.min.js', '//cdn.ably.io/lib/ably.min.js'] unless defined?(DEPENDENCIES)

  class << self
    attr_accessor :data

    def jsbin_id_from_content(content)
      data['jsbin_hash'][hash(content)]
    end

    def jsbin_id_from_path(path)
      jsbin_hash = data['jsbin_id'][path.downcase]
      data['jsbin_hash'][jsbin_hash]
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
          files[:html] = DEPENDENCIES.map { |d| "<script src='#{d}' type='text/javascript'></script>" }.join("\n") + "\n\n#{content}"
        else
          raise "Unknown content type #{type}.  Please use Javascript, HTML or CSS only."
        end
      end
      raise "You must specify at least one code block such as Javascript, CSS or HTML" if files.empty?

      config = Ably::Config.new

      jsbin_client = JsBinClient.new(host: config.jsbin_host, port: config.jsbin_port, ssl: config.jsbin_ssl, api_key: config.jsbin_api_key)
      id = jsbin_client.create(files)['url']
      asdsadsa
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
        url: jsbin_client.url_for(id)
      }
    end

    private
      def hash(content)
        Digest::SHA1.base64digest(content)
      end
  end

  @data = YAML::load(File.read(YAML_PATH))
end