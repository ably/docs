class AblyPreTextileFilter < Nanoc::Filter
  identifier :ably_pre_textile
  type :text

  def run(content, params = {})
    # language blocks in textile don't support multiple languages, so simply copy & split out
    # bc[json,javascript]. { "a": true }
    # becomes
    # bc[json]. { "a": true }
    # bc[javascript]. { "a": true }
    content.gsub(/(bc|p|h[1-6])\[([^\]]+)\]\.(.*?)(?:[\n\r]\s*[\n\r]|\Z)/m) do |match|
      block, languages, content = $~.captures
      languages.split(/\s*,/).map do |lang|
        "#{block}[#{lang}].#{content}"
      end.join("\n\n") + "\n\n"
    end
  end
end