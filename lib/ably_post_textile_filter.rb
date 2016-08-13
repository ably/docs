class AblyPostTextileFilter
  unless defined?(LINK_EXTERNAL_REGEX)
    LINK_EXTERNAL_REGEX = %r{
      (<a[^>]*)class="external"([^>]*>)
    }mx

    LINK_INTERNAL_REGEX = %r{
      (<a[^>]*)href="(/[^"]+)"([^>]*>)
    }mx

    TAG_REGEX = %r{(?:<[\w /]+>)*\s*}

    BLANG_REGEX = %r{
      #{TAG_REGEX}
      {{LANG_BLOCK\[([\w,]+)\]}}
      #{TAG_REGEX}
      (.*?)
      #{TAG_REGEX}
      {{/LANG_BLOCK}}
      #{TAG_REGEX}
    }mx
  end

  class << self
    def run(content, path)
      content = convert_blang_blocks_to_html(content)
      content = add_github_line_breaks(content)
      content = convert_external_links_to_blank_target(content)
      content = ensure_internal_versioned_links_remain_in_version(content, path)
    end

    # Line breaks when using Github notation insert <br /> tags, replace them with actual HTML <br />
    def add_github_line_breaks(content)
      content.gsub('{{{github_br}}}', "\n")
    end

    # Find blang[lang]. converted blocks in form {{LANG_BLOCK[lang]}} and convert to
    #   <div lang="lang">[[content]]</div> format.
    #
    # Refer to AblyPreTextileFilter#convert_blang_blocks_to_html for initial processing
    #
    def convert_blang_blocks_to_html(content)
      content.gsub(BLANG_REGEX, %{\n\n<div lang="\\1"> <!-- start \\1 language block -->\n\\2\n</div> <!-- /end \\1 language block -->\n\n})
    end

    def convert_external_links_to_blank_target(content)
      content.gsub(LINK_EXTERNAL_REGEX, %{\\1target="_blank"\\2})
    end

    def ensure_internal_versioned_links_remain_in_version(content, path)
      content.gsub(LINK_INTERNAL_REGEX) do
        %{#{$1}href="#{ensure_relative_url_matches_current_version(path, $2)}"#{$3}}
      end
    end
  end
end
