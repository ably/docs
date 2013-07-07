module Ably
  class Config
    def aws_access_key_id
      fog_yaml['default']['aws_access_key_id']
    end

    def aws_secret_access_key
      fog_yaml['default']['aws_secret_access_key']
    end

    def s3_bucket
      'docs.ably.io'
    end

    def s3_host
      's3.amazonaws.com'
    end

    def jsbin_host
      jsbin_config_yaml['host']
    end

    def jsbin_port
      jsbin_config_yaml['port']
    end

    def jsbin_ssl
      jsbin_config_yaml['ssl']
    end

    def jsbin_api_key
      jsbin_config_yaml['api_key']
    end

    private
      def fog_yaml
        begin
          YAML::load(open(File.expand_path('~/.fog')))
        rescue StandardError => e
          puts "Error loading AWS credentials from .fog file in your user directory.  Is this set up?"
          raise e
        end
      end

      def jsbin_config_yaml
        begin
          YAML::load(open(File.expand_path('../jsbin_config.yaml', __FILE__)))
        rescue StandardError => e
          puts "Error loading JsBin config.  Have you created this in config using the example YAML file?"
          raise e
        end
      end
  end
end