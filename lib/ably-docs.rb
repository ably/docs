require 'redcloth'

# AblyDocs is only used by other apps that load in this repo as a Gem and need paths to the files
#
class AblyDocs
  class << self
    def content_path
      File.expand_path("../content", File.dirname(__FILE__))
    end

    def lib_path
      File.expand_path("../lib", File.dirname(__FILE__))
    end

    def data_path
      File.expand_path("../data", File.dirname(__FILE__))
    end
  end
end

# Full path is required to YAML files when loaded as Gem
YAML_PATH = File.join(AblyDocs.data_path, 'jsbins.yaml')
