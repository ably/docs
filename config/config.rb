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

    private
      def fog_yaml
        begin
          YAML::load(open(File.expand_path('~/.fog')))
        rescue StandardError => e
          puts "Error loading AWS credentials from .fog file in your user directory.  Is this set up?"
          raise e
        end
      end
  end
end