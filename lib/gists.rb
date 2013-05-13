require 'digest/sha1'
require 'gist'

class Gists
  YAML_PATH = 'data/gists.yaml' unless defined?(YAML_PATH)
  DEPENDENCIES = ['http://code.jquery.com/jquery-1.9.1.min.js', 'http://cdn.ably.io/lib/ably.min.js'] unless defined?(DEPENDENCIES)
  FORMAT = :jsfiddle unless defined?(FORMAT) #jsbin

  class << self
    attr_accessor :data

    def gist_id_from_content(content)
      data['gist_hash'][hash(content)]
    end

    def gist_id_from_path(path)
      gist_hash = data['gist_id'][path.downcase]
      data['gist_hash'][gist_hash]
    end

    def publish_gist(path, content)
      parts = content.scan(/\[\-{3} (\w+) \-{3}\]\s*(.+)\s*\[\-{3} \/\1 \-{3}\]/m)
      files = {}
      Hash[*parts.flatten].each do |type, content|
        case type.downcase
        when 'javascript'
          files['fiddle.js'] = content
        when 'css'
          files['fiddle.css'] = content
        when 'html'
          if FORMAT == :jsbin
            files['fiddle.html'] = DEPENDENCIES.map { |d| "<script src='#{d}' type='text/javascript'></script>" }.join("\n") + "\n\n#{content}"
          else
            files['fiddle.html'] = content
          end
        else
          raise "Unknown content type #{type}.  Please use Javascript, HTML or CSS only."
        end
      end
      raise "You must specify at least one code block such as Javascript, CSS or HTML" if files.empty?

      if FORMAT == :jsfiddle
        files['fiddle.manifest'] = <<-EOF
  name: "Ably realtime example: #{path}"
  description: "Browser example for documentation at https://ably.io/documentation"
  authors:
    - Ably.io
  resources:
    - http://code.jquery.com/jquery-1.9.1.min.js
    - http://cdn.ably.io/lib/ably.min.js
  normalize_css: no
        EOF
      end

      id = Gist.multi_gist(files, public: true)['id']
      data['gist_id'][path] = hash(content)
      data['gist_hash'][hash(content)] = id

      hashes_in_use = data['gist_id'].invert
      data['gist_hash'].delete_if { |hash, id| !hashes_in_use.has_key?(hash) }

      yaml_content = YAML::dump(data)
      File.open(YAML_PATH, 'w') do |f|
        f.write(yaml_content)
      end

      id
    end

    private
      def hash(content)
        Digest::SHA1.base64digest(content)
      end
  end

  @data = YAML::load(File.read(YAML_PATH))
end