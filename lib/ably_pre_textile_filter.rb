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

    # remove white space between language divs
    content = content.gsub(/\<\/div\>\s+\<div\slang=["']([^"']+)["']>/, '</div><div lang="\1">')

    # insert inline table of contents
    content = content.gsub(/^inline\-toc\.\s*$(.*?)^\s*$/m) do |match|
      yaml_raw = $~.captures[0]
      yaml = YAML::load(yaml_raw)
      NavHelper.inline_toc_items(yaml)
    end

    # convert code editor class tags into a format that can be decoded on the front end
    folder = @item.path.match(/\/([^\/]+)\/?$/)[1]
    content = content.gsub(/\(code-editor:([^\)]+)\)/i, "(code-editor load-file___#{folder}___\\1)")
  end
end