require_relative './helpers/nav_helper'

class AblyPreTextileFilter
  remove_const :BLANG_REGEX if defined?(BLANG_REGEX)
  remove_const :MINIMIZE_REGEX if defined?(MINIMIZE_REGEX)
  remove_const :MULTI_LANG_BLOCK_REGEX if defined?(MULTI_LANG_BLOCK_REGEX)
  remove_const :JSALL_REGEX if defined?(JSALL_REGEX)

  BLANG_REGEX = /^blang\[([\w,]+)\]\.\s*$/

  MINIMIZE_REGEX = /^minimize\.(?:\w*?)(.*?)$/

  MULTI_LANG_BLOCK_REGEX = /
    (bc|p|h[1-6])           # code or language tag - capture [0] = tag
       \[([^\]]+)\]         # language selector in format [javascript,ruby] - capture [1] = langs
    (?:\(([^\)]+)\))?       # optional class(es) in format (class) - capture [2] = class(es)
    \.                      # ends with . such as p[ruby].
    (.*?)                   # body - capture [3] = body
    (?:[\n\r]\s*[\n\r]|\Z)  # non-capturing empty line break or EOF
  /mx

  JSALL_REGEX = /
    (?:
      \[         # language enclosure [lang]
      ([^\]]+,)? # additional optional languages
      jsall      # indicates this applies to node.js and javascript
      (,[^\]]+)? # additional optional languages
      \]         # language closure [lang]
    )
    |
    (?:
      lang=(["']) # language enclosure lang=""
      ([^"']+,)? # additional optional languages
      jsall       # indicates this applies to node.js and javascript
      (,[^"']+)? # additional optional languages
      \3          # language closure lang=""
    )
    |
    (?:
      (  jsall\: ) # Indicates this applies to node.js and javascript
    )
  /mx

  class << self
    def run(content, path, attributes)
      content = strip_comments(content)
      content = add_minimize_for_headings(content)
      content = add_minimized_indent(content)
      content = convert_jsall_lang_to_node_and_javascript(content)
      content = convert_blang_blocks_to_html(content)
      content = add_language_support_for_github_style_code(content)
      content = duplicate_language_blocks(content)
      content = trim_white_space_between_language_elements(content)
      content = insert_inline_table_of_contents(content)
      content = add_language_support_for_block_quotes(content)
      content = add_language_support_for_headings(content)
      content = add_spec_anchor_links(content, attributes)
      add_support_for_inline_code_editor(content, path)
    end

    private

    # To simplify the Textile markup when writing examples or docs that apply to both
    # Node.js and Javascript, a single language jsall is supported, that is converted
    # to javascript,nodejs when compiled
    def convert_jsall_lang_to_node_and_javascript(textile)
      textile.gsub(JSALL_REGEX) do |match|
        lang_before, lang_after, quote, lang_before_2, lang_after_2 = $~.captures
        langs = [lang_before || lang_before_2, lang_after || lang_after_2].compact
        if quote
          %(lang="javascript,nodejs#{",#{langs.join(',')}" unless langs.empty?}")
        elsif lang_after
          "[javascript,nodejs#{",#{langs.join(',')}" unless langs.empty?}]"
        else
          "  javascript,nodejs: "
        end
      end
    end

    # language blocks in textile don't support multiple languages, so simply copy & split out
    # bc[json,javascript]. { "a": true }
    # becomes
    # bc[json]. { "a": true }
    # bc[javascript]. { "a": true }
    def duplicate_language_blocks(textile)
      textile.gsub(MULTI_LANG_BLOCK_REGEX) do |match|

        block, languages, classes, content = $~.captures
        languages.split(/\s*,/).map do |lang|
          "#{block}[#{lang}]#{"(#{classes})" if classes}.#{content}"
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
      lang_regex = '\\[([^\\]]+)\\]'
      code_editor_regex = '\\(([^\\)]+)\\)'
      lang_and_editor_regex = "(?:#{lang_regex})?(?:#{code_editor_regex})?"
      content.gsub(/^```#{lang_and_editor_regex}\s*?\n?(.+?)^```\s*$/m) do |match|
        languages, code_editor, content = $~.captures
        if languages
          "bc[#{languages}]#{"(#{code_editor})" if code_editor}. #{strip_heredoc(content)}"
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
      content.gsub(/^bq\(definition(?<anchor>\#[^\)]+)?\)\.\s*\n.*?\n\s*\n/m) do |match|
        anchor = $~.captures[0]
        lang_definitions = match.scan(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/)
        lang_spans = lang_definitions.map do |lang, definition|
          if lang == 'jsall'
            "<span lang='javascript,nodejs'>#{definition}</span>"
          else
            "<span lang='#{lang}'>#{definition}</span>"
          end
        end.join('')
        "bq(definition#{anchor}). #{lang_spans}\n\n"
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
      content.gsub(%r{^(h[1-6])(\(#[^\)]+\))?(\([^(\)|#)]+\))?\.\s*\n.+?\n\s*\n}m) do |match|
        h_tag, anchor, option = $1, $2, $3
        lang_definitions = match.scan(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/)
        lang_spans = lang_definitions.map { |lang, definition| "<span lang='#{lang}'>#{definition}</span>" }.join('')
        "#{h_tag}#{anchor}. #{lang_spans}\n\n"
      end
    end


    # h[1-6] for method definitions use format
    # 
    # h6(#optional-anchor)(minimize). method
    #
    # transform to
    # h6(#optional-anchor). method <div class='collapsible-wrapper'>...{content}...</div>
    def add_minimize_for_headings(content)
      expand_num = 0
        content.gsub(%r{^(h[1-6])(\(#[^\)]+\))?\(minimize(?:=([^\)]*))?\)\.(.*?)\n\n(.+?)(?=(?:\n\nh[1-6])|(?:\Z))}m) do |match|
          h_tag, anchor, expand_title, title, content = $1, $2, $3, $4, $5, $6
            expand_num = expand_num + 1
            if expand_title.nil? || expand_title.empty? 
              expand_title = "+ View More"
            else 
              expand_title = "+ #{expand_title}"
            end
            "#{h_tag}#{anchor}.#{title}\n\n
            <div class='collapsible-wrapper'>
            <input id='collapsible-heading#{expand_num}' class='minimize-checkbox toggle' type='checkbox'>
            <label for='collapsible-heading#{expand_num}' class='label-collapsible'>#{expand_title}</label>
            <div class='collapsible-content'>
            <div class='collapsible-inner'>\n\n#{content}\n\n
            </div>
            <label for='collapsible-heading#{expand_num}' class='label-collapsible-close'>- View Less</label>
            </div>
            </div>\n\n"
        end
    end

    # Converts minimize indicator and following indented text to minimizable
    # minimize. method
    def add_minimized_indent(content)
      expand_num=0
      while position = content.index(MINIMIZE_REGEX)
        subsequent_lines = content[position..-1].split(/\n\r|\n/)
        expand_title = subsequent_lines[0][MINIMIZE_REGEX, 1]
        if expand_title.nil? || expand_title.empty? 
          expand_title = "+ View More"
        else 
          expand_title = "+ #{expand_title}"
        end
        minimize_block = subsequent_lines.shift
        break if subsequent_lines.empty?

        indentation = subsequent_lines[0][/^\s+/, 0]
        raise "minimize. blocks must be followed by indentation. Offending block: '#{minimize_block}'\n
        #{subsequent_lines[0..2].join("\n")}" unless indentation

        line_index = 1
        while valid_line?(subsequent_lines[line_index], indentation)
          line_index += 1
          if last_line?(subsequent_lines, line_index)
            # If last line, increase index by one i.e. beyond this line
            #  so that the last line is included in the blang block
            line_index += 1
            break
          end
        end
        expand_num = expand_num+1
        content = [
          content[0...position],
          "<div class='collapsible-wrapper'>
          <input id='collapsible-indent#{expand_num}' class='minimize-checkbox toggle' type='checkbox'>
          <label for='collapsible-indent#{expand_num}' class='label-collapsible'>#{expand_title}</label>
          <div class='collapsible-content'>
          <div class='collapsible-inner'>\n",
          subsequent_lines[0...line_index].map { |d| d.gsub(/^#{indentation}/, '') },
          "\n\n</div>
          <label for='collapsible-indent#{expand_num}' class='label-collapsible-close'>- View Less</label>
          </div>
          </div>\n\n",
          subsequent_lines[line_index..-1]
        ].flatten.compact.join("\n")
      end
      content
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

    # Find blang[lang] markup and wraps for later post textile processing
    #
    # This method finds every occurrence of blang[lang,lang]. markup,
    #   determines how many subsequent lines are part of the block based on indentation,
    #   and then wraps the blocks in {{LANG_BLOCK[language,language]}} ... {{/LANG_BLOCK}}
    #   that are processed post textile processing.
    #
    def convert_blang_blocks_to_html(content)
      while position = content.index(BLANG_REGEX)
        languages = content[BLANG_REGEX, 1]
        subsequent_lines = content[position..-1].split(/\n\r|\n/)
        blang_block = subsequent_lines.shift
        break if subsequent_lines.empty?

        indentation = subsequent_lines[0][/^\s+/, 0]
        raise "blang[langauge]. blocks must be followed by indentation. Offending block: '#{blang_block}'\n#{subsequent_lines[0..2].join("\n")}" unless indentation

        line_index = 1
        while valid_line?(subsequent_lines[line_index], indentation)
          line_index += 1
          if last_line?(subsequent_lines, line_index)
            # If last line, increase index by one i.e. beyond this line
            #  so that the last line is included in the blang block
            line_index += 1
            break
          end
        end

        content = [
          content[0...position],
          "{{LANG_BLOCK[#{languages}]}}\n",
          subsequent_lines[0...line_index].map { |d| d.gsub(/^#{indentation}/, '') },
          "\n{{/LANG_BLOCK}}\n",
          subsequent_lines[line_index..-1]
        ].flatten.compact.join("\n")
      end

      content
    end

    def add_spec_anchor_links(content, attributes)
      if attributes[:anchor_specs]
        content = content.gsub(%r{\* @\((\w+)\)@}) do
          spec_id = Regexp.last_match[1]
          "* <a id='#{spec_id}' name='#{spec_id}' href='##{spec_id}'>@(#{spec_id})@</a>"
        end
      end
      content
    end

    private
    def valid_line?(line, indentation)
      line.start_with?(indentation) || line.match(/^\s*$/)
    end

    def last_line?(subsequent_lines, line_index)
      line_index == subsequent_lines.length - 1
    end
  end
end
