module VersionsHelper
  CURRENT_VERSION = '1.1' unless defined?(CURRENT_VERSION)

  VERSIONED_FOLDERS = %w(
    client-lib-development-guide
    general
    realtime
    rest
    rest-api
    shared
    types
    core-features
  ) unless defined?(VERSIONED_FOLDERS)

  def relative_url_versioned?(url)
    !!version_from_relative_url(url)
  end

  def version_from_relative_url(url, current_default: false)
    @version_from_relative_url_cache ||= {}
    @version_from_relative_url_cache["#{url}:#{current_default}"] ||= begin
      VERSIONED_FOLDERS.each do |root_folder|
        if match = url.match(%r{^/#{root_folder}/versions/v([\d\.]+)})
          return match[1]
        end
      end

      CURRENT_VERSION if current_default
    end
  end

  def ensure_relative_url_matches_current_version(current_path, relative_url)
    @ensure_relative_url_matches_current_version_cache ||= {}
    @ensure_relative_url_matches_current_version_cache["#{current_path}:#{relative_url}"] ||= begin
      current_path_version = version_from_relative_url(current_path)

      # If current page path is not in a versioned folder no rewriting is needed
      if current_path_version
        # Do not rewrite links to explicit versions
        unless relative_url_versioned?(relative_url)
          if version_exists_for_path?(current_path_version, relative_url)
            return path_for_version(current_path_version, relative_url)
          end
        end
      end

      relative_url
    end
  end

  def page_is_versioned?
    list_versions_for(@item.path).length > 1
  end

  # Returns an array of version strings in order of highest to lowest
  def page_versions
    list_versions_for(latest_version_of(@item.path))
  end

  # Returns versioned version of a partial link where applicable
  def partial_version(partial)
    if match = @item.path.match(%r{/versions/(v[\d\.]+)/})
      partial = "/versions/#{match[1]}/#{partial}"
    end

    return partial
  end

  # Returns an array of version strings in order of highest to lowest
  def partial_page_versions(partial)
    list_versions_for(latest_version_of(partial))
  end

  # Returns an array of arrays of version strings & paths to
  # this file for each version in order of highest to lowest
  def page_versions_with_paths
    page_versions.map do |version|
      [version, path_for_version(version, @item.path)]
    end
  end

  # Returns a list of all languages and supported versions
  # All versions are listed unless an explicit max (or min) version is specified
  def lang_version_spec
    @lang_version_spec_cache ||= {}
    @lang_version_spec_cache[@item.path] ||= begin
      lang_versions = Ably::DOCUMENTATION_LANGUAGES.reject do |lang_id, lang|
        lang[:ignore_from_language_selector]
      end.map do |lang_id, lang|
        [lang_id, supported_versions_for_language(@item.path, lang_id)]
      end.each_with_object({}) do |(lang_id, version), hash|
        hash[lang_id] = {
          versions: version,
          most_recent_path: path_for_version(version.first, @item.path)
        }
      end
      latest_version_and_path = page_versions_with_paths.first
      js = [
        "window.AblyVersionInfo={",
          "'langVersions':#{JSON.dump(lang_versions)},",
          "'latestForPage':{'version': '#{latest_version_and_path.first}', 'path': '#{latest_version_and_path.last}'},",
          "'page':'#{version_from_relative_url(@item.path, current_default: true)}'",
        "}"
      ]
      %{<script type="text/javascript">#{js.join('')}</script>}
    end
  end

  private
  # Split a URL into three parts
  # - complete path
  # - root_folder (such as /realtime or /rest)
  # - relative_path
  def split_relative_url(relative_url)
    relative_url.match(%r{^/([^/#]+)(.*?)$}).to_a
  end

  def path_for_version(version, path)
    @path_for_version_cache ||= {}
    @path_for_version_cache["#{version}:#{path}"] ||= begin
      _, root_folder, relative_path = split_relative_url(non_versioned_path(path))
      if root_folder
        if version == CURRENT_VERSION
          "/#{root_folder}#{relative_path}"
        else
          "/#{root_folder}/versions/v#{version}#{relative_path}"
        end
      else
        puts "Warning: Link '#{path}' does not break into parts so cannot version"
        path
      end
    end
  end

  # Get a list of all versions for this path by inspecting the /versions folder
  def list_versions_for(path)
    @list_versions_for_cache ||= {}
    @list_versions_for_cache[path] ||= begin
      _, root_folder, relative_path = split_relative_url(non_versioned_path(path))
      possible_versions = [CURRENT_VERSION] + Dir.glob("#{content_path}/#{root_folder}/versions/v*").map do |path|
        version_from_relative_url(path[content_path.length..-1])
      end

      possible_versions.select do |version|
        version_exists_for_path?(version, path)
      end.compact.sort_by do |version|
        major_minor(version)
      end.reverse
    end
  end

  # To determine which languages are supported for a language:
  # 1. Determine if language constraints specified in `languages:` YAML in format language[,maxVer[,minVer]]
  # 2. Determine which version files exist for this content
  # 3. Return an ordered list of versions within the max & min
  def supported_versions_for_language(path, language)
    @supported_versions_for_language_cache ||= {}
    @supported_versions_for_language_cache["#{path}:#{language}"] ||= begin
      latest_item = @items.find do |it|
        it.path == latest_version_of(path)
      end
      raise "Could not get latest version of '#{path}'" unless latest_item

      configuration_for_language = if latest_item[:languages]
        latest_item[:languages].find do |item_language|
          item_language.split(',')[0] == language
        end
      end || language # if no explicit language specified, then no version constraints exist

      max_supported_version = configuration_for_language.split(',')[1]
      max_supported_version = CURRENT_VERSION if max_supported_version.nil? || max_supported_version.empty?

      min_supported_version = configuration_for_language.split(',')[2]

      list_versions_for(item.path).reject do |version|
        if min_supported_version
          # Use <=> to indicate whether this version is greater than or
          # equal to min_supported_version i.e. 1 or 0
          compare = major_minor(version) <=> major_minor(min_supported_version)
          next true if compare < 0
        end

        compare = major_minor(version) <=> major_minor(max_supported_version)
        next true if compare > 0
      end.sort_by do |version|
        major_minor(version)
      end.reverse
    end
  end

  # Split version string "0.8" into major minor integers such as [0,8]
  def major_minor(version)
    version.split('.').map(&:to_i)
  end

  # Passing a path to any file whether versioned or not
  # returns the latest version path for that path
  def latest_version_of(path)
    @latest_version_of_cache ||= {}
    @latest_version_of_cache[path] ||= begin
      if relative_url_versioned?(path)
        if has_current_version_for?(path)
          non_versioned_path(path)
        else
          _, root, relative_path = split_relative_url(path)
          latest_version = list_versions_for(path).first
          "/#{root}/versions/v#{latest_version}#{relative_path}"
        end
      else
        path
      end
    end
  end

  # True when the versioned or non-versioned path provided has a matching
  # current version i.e. without an explicit version
  def has_current_version_for?(path)
    file_with_any_ext_exists_for?(non_versioned_path(path))
  end

  def non_versioned_path(path)
    path.gsub(%r{/versions/v([\d\.]+)}, '')
  end

  def version_exists_for_path?(version, path)
    _, root_folder, relative_path = split_relative_url(non_versioned_path(path))

    base_path = if version == CURRENT_VERSION
      "/#{root_folder}"
    else
      "/#{root_folder}/versions/v#{version}"
    end

    file_with_any_ext_exists_for?("#{base_path}#{relative_path}")
  end

  def file_with_any_ext_exists_for?(path)
    @file_with_any_ext_exists_for_cache ||= {}
    @file_with_any_ext_exists_for_cache[path] ||= begin
      _, root_folder, relative_path = split_relative_url(path)

      # Strip any params or hash locations
      relative_path = relative_path.gsub(/[\#\?].*$/, '')

      file_path = if relative_path == '/'
        "#{content_path}/#{root_folder}/index"
      else
        "#{content_path}/#{root_folder}#{relative_path.gsub(%r{/$}, '')}"
      end

      !Dir.glob("#{file_path}.*").empty?
    end
  end

  def content_path
    File.expand_path("../../content", File.dirname(__FILE__))
  end
end

include VersionsHelper if defined?(Nanoc)
