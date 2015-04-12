class AblyPostTextileFilter
  class << self
    def run(content, path)
      content = convert_blang_blocks_to_html(content)
      add_github_line_breaks(content)
    end

    # Line breaks when using Github notation insert <br /> tags, replace them with actual HTML <br />
    def add_github_line_breaks(content)
      content.gsub('{{{github_br}}}', '<br/>')
    end

    # Find blang[lang]. converted blocks in form {{LANG_BLOCK[lang]}} and convert to
    #   <div lang="lang">[[content]]</div> format.
    #
    # Refer to AblyPreTextileFilter#convert_blang_blocks_to_html for initial processing
    #
    def convert_blang_blocks_to_html(content)
      content.gsub(blang_regex, %{\n\n<div lang="\\1"> <!-- start \\1 language block -->\n\\2\n</div> <!-- /end \\1 language block -->\n\n})
    end

    private
    def blang_regex
      tag_regex = %r{(?:<[\w /]+>)*\s*}
      %r{
        #{tag_regex}
        {{LANG_BLOCK\[([\w,]+)\]}}
        #{tag_regex}
        (.*?)
        #{tag_regex}
        {{/LANG_BLOCK}}
        #{tag_regex}
      }mx
    end
  end
end
