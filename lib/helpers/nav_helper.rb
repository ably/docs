module NavHelper
  def nav_items(section)
    results = []
    @items.select { |d| d[:section] == section }.each do |item|
      results << "<li><a href='#{html_escape(item.path)}'>#{html_escape(item[:title])}</a></li>"
    end
    results.join("\n")
  end

  def toc_items(context)
    html = []
    if context.kind_of?(String)
      link_title = context
      link = if context.match(/(.+)#(.+)/)
        link_title, link_id = context.match(/(.+)#(.+)/)[1..2]
        link_id
      else
        link_title.downcase
      end
      html << "<li><a href='##{link}'>#{link_title}</a></li>"
    elsif context.kind_of?(Array)
      html << "<ul>"
      context.each do |item|
        html << toc_items(item)
      end
      html << "</ul>"
    elsif context.kind_of?(Hash)
      context.each do |key, val|
        html << "<li>"
        html << key
        html << toc_items(val)
        html << "</li>"
      end
    end
    html.join("\n")
  end
end

include NavHelper