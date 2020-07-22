module Ably
  module Docs
    class Config
      JSBIN_HOST    = "jsbin.ably.com"
      JSBIN_SSL     = true
      JSBIN_PORT    = 443
      JSBIN_API_KEY = "readonly"

      def aws_access_key_id
        fog_yaml['ably']['aws_access_key_id']
      end

      def aws_secret_access_key
        fog_yaml['ably']['aws_secret_access_key']
      end

      def s3_bucket
        'docs.ably.io'
      end

      def s3_host
        's3.amazonaws.com'
      end

      def jsbin_host
        @jsbin_host ||= jsbin_config_yaml['host'] || JSBIN_HOST
      end

      def jsbin_port
        @jsbin_port ||= jsbin_config_yaml['port'] || JSBIN_PORT
      end

      def jsbin_ssl
        @jsbin_ssl ||= jsbin_config_yaml['ssl'] || JSBIN_SSL
      end

      def jsbin_api_key
        @jsbin_api_key ||= jsbin_config_yaml['api_key'] || JSBIN_API_KEY
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
            {}
          end
        end
    end
  end
end
