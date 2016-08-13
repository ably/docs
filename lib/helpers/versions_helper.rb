module VersionsHelper
  VERSIONED_FOLDERS = %w(
    client-lib-development-guide
    general
    realtime
    rest
    rest-api
    shared
    types
  )

  def relative_url_versioned?(url)
    !!version_from_relative_url(url)
  end

  def version_from_relative_url(url)
    VERSIONED_FOLDERS.each do |root_folder|
      if match = url.match(%r{^/#{root_folder}/versions/v([\d\.]+)})
        return match[1]
      end
    end
    nil
  end

  def ensure_relative_url_matches_current_version(current_path, relative_url)
    current_path_version = version_from_relative_url(current_path)

    # If current page path is not in a versioned folder no rewriting is needed
    if current_path_version
      # Do not rewrite links to explicit versions
      unless relative_url_versioned?(relative_url)
        relative_url_parts = relative_url.match(%r{^/([^/#]+)(.*?)$})
        if relative_url_parts
          return "/#{relative_url_parts[1]}/versions/v#{current_path_version}#{relative_url_parts[2]}"
        else
          puts "Warning: Link '#{relative_url}' in #{current_path} does not break into parts so cannot version"
        end
      end
    end

    relative_url
  end
end

include VersionsHelper if defined?(Nanoc)
