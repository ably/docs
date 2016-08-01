class AblyFreshdeskPostCompile < Nanoc::Filter
  identifier :ably_freshdesk_post_compile
  type :text

  def run(content, params = {})
    add_inline_styles(content)
  end

  private
  # Freshdesk strips style tags and all but a few inline styles, and applies a
  # default styling of no margins at all (spacing in the wysiwyg editor is done
  # with autoadded <p><hr></p> nonsense). Add some inline styles to make the
  # markdown output look presentable
  def add_inline_styles(content)
    content
      .gsub(/<(p|li)>/, '<\1 style="margin-bottom: 0.5em">')
      .gsub(/<(h2.*?)>/, '<\1 style="margin-top: 1em">') # .*? nongreedy matcher to catch the ids of h2s
      .gsub(/<(table)>/, '<\1 style="margin-bottom: 1em; border-collapse: collapse;" border="1">')
  end
end
