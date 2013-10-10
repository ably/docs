class AblyPreTextileFilter < Nanoc::Filter
  identifier :ably_pre_textile
  type :text

  def run(content, params = {})
    # language blocks in textile don't support multiple languages, so simply copy & split out
    # bc[json,javascript]. { "a": true }
    # becomes
    # bc[json]. { "a": true }
    # bc[javascript]. { "a": true }
    content = content.gsub(/(bc|p|h[1-6])\[([^\]]+)\]\.(.*?)(?:[\n\r]\s*[\n\r]|\Z)/m) do |match|
      block, languages, content = $~.captures
      languages.split(/\s*,/).map do |lang|
        "#{block}[#{lang}].#{content}"
      end.join("\n\n") + "\n\n"
    end

    # remove white space between language divs or spans
    content = content.gsub(/\<\/(div|span)\>\s+\<\1\slang=["']([^"']+)["']>/, '</\1><\1 lang="\2">')

    # insert inline table of contents
    content = content.gsub(/^inline\-toc\.\s*$(.*?)^\s*$/m) do |match|
      yaml_raw = $~.captures[0]
      yaml = YAML::load(yaml_raw)
      NavHelper.inline_toc_items(yaml)
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
    content = content.gsub(/^bq\(definition(\#[^\)]+)?\)\.\s*\n.*?\n\s*\n/m) do |match|
      lang_definitions = match.scan(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/)
      lang_spans = lang_definitions.map { |lang, definition| "<span lang='#{lang}'>#{definition}</span>" }.join('')
      "bq(definition). #{lang_spans}\n\n"
    end


    # convert code editor class tags into a format that can be decoded on the front end
    folder = @item.path.match(/\/([^\/]+)\/?$/)[1]
    content = content.gsub(/\(code-editor:([^\)]+)\)/i, "(code-editor load-file___#{folder}___\\1)")
  end
end