module NavHelper
  def nav_items(section, options = {})
    items = @items.select { |d| d[:section] == section }
    if items.empty?
      ""
    else
      results = ['<ul>']
      last_group = nil
      if options.has_key?(:title)
        index_item = items.find { |d| d[:index].to_i == 0 }
        if index_item
          results.unshift "<h2#{index_item == @item ? ' class="selected"' : ''}><a href=\"#{html_escape(index_item.path)}\">#{html_escape(options[:title])}</a></h2>"
          items.delete index_item
        else
          results.unshift "<h2>#{html_escape(options[:title])}</h2>"
        end
      end
      items.map.sort { |a,b| (a[:index].to_i || 100) <=> (b[:index].to_i || 100) }.each do |item|
        if item[:group] && item[:group] != last_group
          results << "<li>#{html_escape(item[:group])}</li>"
          last_group = item[:group]
        end
        results << "<li class='#{item == @item ? 'selected' : ''}'><a href='#{html_escape(item.path)}'>#{html_escape(item[:title])}</a></li>"
      end
      if options.has_key?(:append)
        append_items = options[:append].kind_of?(Array) ? options[:append] : [options[:append]]
        results += append_items.map { |d| "<li>#{d}</li>" }
      end
      results << '</ul>'
      results.join("\n")
    end
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
      link = link.gsub(/\s/,'-')
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