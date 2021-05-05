class AblyDocs::Redirects
  REDIRECTS_YAML_PATH = 'data/redirects.yaml' unless defined?(REDIRECTS_YAML_PATH)

  class << self
    attr_accessor :data

    def publish_redirects(content)
      File.open(REDIRECTS_YAML_PATH, 'w') do |file|
        file.write(content.to_yaml)
      end
    end

    def redirect_for(template)
      search = %r{\A\/?#{template}\/?\z}
      key = data.keys.detect { |key| key =~ search }
      data[key]
    end
  end

  @data = YAML.safe_load(File.read(REDIRECTS_YAML_PATH))
end
