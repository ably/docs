require 'rack/utils'

class AblyMarkdownCodeForFreshdesk < Nanoc::Filter
  identifier :ably_markdown_code_for_freshdesk
  type :text

  def run(content, params = {})
    markup_code_blocks(content)
  end

  private
  # Convert backtick ``` code blocks into code blocks
  # that work with Freshdesk solution pages
  def markup_code_blocks(content)
    lang_regex = '([^\n]+)?'
    content.gsub(/^```#{lang_regex}\s*?\n?(.+?)^```\s*$/m) do |match|
      language, content = $~.captures
      code = Rack::Utils.escape_html(strip_heredoc(content))
      %{<pre code-brush="#{language}" rel="highlighter" contenteditable="false" style="margin-bottom: 1em;">#{code}</pre>\n\n}
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
