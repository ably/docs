require_relative './helpers/nav_helper'

class AblyPreTextileFilter
  class << self
    def run(content, path)
      content = strip_comments(content)
      content = add_language_support_for_github_style_code(content)
      content = duplicate_language_blocks(content)
      content = trim_white_space_between_language_elements(content)
      content = insert_inline_table_of_contents(content)
      content = add_language_support_for_block_quotes(content)
      content = add_language_support_for_headings(content)
      content = add_support_for_inline_code_editor(content, path)
    end

    private

    # language blocks in textile don't support multiple languages, so simply copy & split out
    # bc[json,javascript]. { "a": true }
    # becomes
    # bc[json]. { "a": true }
    # bc[javascript]. { "a": true }
    def duplicate_language_blocks(content)
      content.gsub(/(bc|p|h[1-6])\[([^\]]+)\]\.(.*?)(?:[\n\r]\s*[\n\r]|\Z)/m) do |match|
        block, languages, content = $~.captures
        languages.split(/\s*,/).map do |lang|
          "#{block}[#{lang}].#{content}"
        end.join("\n\n") + "\n\n"
      end
    end

    # remove white space between language divs or spans
    def trim_white_space_between_language_elements(content)
      content.gsub(/\<\/(div|span)\>\s+\<\1\slang=["']([^"']+)["']>/, '</\1><\1 lang="\2">')
    end

    # insert inline table of contents
    def insert_inline_table_of_contents(content)
      content.gsub(/^inline\-toc\.\s*$(.*?)^\s*$/m) do |match|
        yaml_raw = $~.captures[0]
        yaml = YAML::load(yaml_raw)
        NavHelper.inline_toc_items(yaml)
      end
    end

    def strip_comments(content)
      regex = /<!--.*?-->\s*/
      content.gsub(regex, '')
    end

    # Convert backtick ``` code blocks into standard textile bc[] blocks
    def add_language_support_for_github_style_code(content)
      lang_regex = '(?:\\[([^\]]+)\\])?'
      content.gsub(/^```#{lang_regex}\s*?\n?(.+?)^```\s*$/m) do |match|
        languages, content = $~.captures
        if languages
          "bc[#{languages}]. #{strip_heredoc(content)}"
        else
          "bc. #{strip_heredoc(content)}"
        end.gsub(/^\s*\n/m, '{{{github_br}}}')
      end
    end

    # blockquote for method definitions use format
    #
    # bq(definition). definition
    #
    #   -- or --
    #
    # bq(definition).
    #   default: definition
    #   lang:    definition
    # --- white space required ---
    #
    # transform to
    # bq(definition). <span lang="default">definition</span><span lang="lang">definition</span>
    def add_language_support_for_block_quotes(content)
      content.gsub(/^bq\(definition(\#[^\)]+)?\)\.\s*\n.*?\n\s*\n/m) do |match|
        lang_definitions = match.scan(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/)
        lang_spans = lang_definitions.map { |lang, definition| "<span lang='#{lang}'>#{definition}</span>" }.join('')
        "bq(definition). #{lang_spans}\n\n"
      end
    end

    # h[1-6] for method definitions use format
    #
    # h6(#optional-anchor). method
    #
    #   -- or --
    #
    # h6(#optional-anchor).
    #   default: method
    #   lang:    method
    # --- white space required ---
    #
    # transform to
    # h6(#optional-anchor). <span lang="default">method</span><span lang="lang">method</span>
    def add_language_support_for_headings(content)
      content.gsub(%r{^(h[1-6])(\(#[^\)]+\))?\.\s*\n.+?\n\s*\n}m) do |match|
        h_tag, anchor = $1, $2
        lang_definitions = match.scan(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/)
        lang_spans = lang_definitions.map { |lang, definition| "<span lang='#{lang}'>#{definition}</span>" }.join('')
        "#{h_tag}#{anchor}. #{lang_spans}\n\n"
      end
    end

    # Convert code editor class tags into a format that can be decoded on the front end
    def add_support_for_inline_code_editor(content, path)
      content.gsub(/\(code-editor:([^\)>]+)\)/i) do
        jsbin_id = JsBins.jsbin_id_from_path(Regexp.last_match[1])
        if jsbin_id
          "(code-editor open-jsbin open-jsbin-#{jsbin_id})"
        else
          puts "Warning: Code-editor for JSBin '#{Regexp.last_match[1]}' not found, skipping"
          Regexp.last_match[0]
        end
      end
    end

    def strip_heredoc(string)
      min = string.scan(/^[ \t]*(?=\S)/).min
      indent = if min.respond_to?(:size)
        min.size
      else
        0
      end
      string.gsub(/^[ \t]{#{indent}}/, '')
    end
  end
end
