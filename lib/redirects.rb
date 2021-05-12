class AblyDocs::Redirects
  REDIRECTS_YAML_PATH = 'data/redirects.yaml' unless defined?(REDIRECTS_YAML_PATH)

  class << self
    attr_accessor :data

    def publish_redirects(content)
      File.open(REDIRECTS_YAML_PATH, 'w') do |file|
        file.write(content.to_yaml)
      end
    end

    def redirect_for(path)
      path = Regexp.escape(path)
      search = %r{\A\/?#{path}\/?\z}
      match = data.find { |from, _to| from =~ search }
      Array(match).last
    end
  end

  @data = YAML.safe_load(File.read(REDIRECTS_YAML_PATH))
end
