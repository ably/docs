module NavHelper
  def nav_items(section, options = {})
    items = @items.select { |d| d[:section] == section && !relative_url_versioned?(d.path) }
    items += [options[:append]].flatten.map { |item| { index: 1_000, html: item }} if options.has_key?(:append)

    wrapper = options.has_key?(:title) ? "nav-has-children" : ""
    results = []

    if items.empty?
      ""
    else
      last_group = nil
      results << "<div class=\"nav-parent\ #{wrapper}\" data-id=\"#{section}\">"

      if options.has_key?(:title)
        index_item = items.find { |d| d[:index].to_i == 0 }
        if index_item
          nav_selected = non_versioned_path(index_item.path) == non_versioned_path(@item.path)
          path = ensure_relative_url_matches_current_version(@item.path, index_item.path)
          selected = "selected" if nav_selected
          results << "<a href=\"#{html_escape(path)}\" class=\"nav-trigger nav-linked #{selected}\" >#{html_escape(options[:title])}</a>"
          items.delete index_item
        else
          results << "<a href=\"#\" class=\"nav-trigger nav-expander\" data-id=\"#{section}\">#{html_escape(options[:title])}</a>"
        end
      end

      results << '<ul class="nav-list">'
      items.map.sort { |a,b| (a[:index].to_i || 100) <=> (b[:index].to_i || 100) }.each do |item|
        next if item[:hide_from_nav]
        if item[:html]
          results << "<li>#{item[:html]}</li>"
        else
          if item[:group] && item[:group] != last_group
            results << "<li>#{html_escape(item[:group])}</li>"
            last_group = item[:group]
          end
          nav_selected = non_versioned_path(item.path) == non_versioned_path(@item.path)
          path = ensure_relative_url_matches_current_version(@item.path, item.path)
          results << "<li class='#{'selected' if nav_selected}'><a href='#{html_escape(path)}'>#{html_escape(item[:title])}</a></li>"
        end
      end
      results << '</ul>'
      results << '</div>'
    end

    results.join("\n")
  end

  # returns an inline TOC
  def inline_toc_items(context, root=true)
    html = []
    if root
      html << '<notextile><div class="inline-toc">'
      context.each do |section, props|
        html << "<ul><li>#{section}"
        html << inline_toc_items(props, false)
        html << '</li></ul>'
      end
      html << '</div></notextile>'
    elsif context.kind_of?(String)
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
        html << inline_toc_items(item, false)
      end
      html << "</ul>"
    elsif context.kind_of?(Hash)
      context.each do |key, val|
        html << "<li>"
        html << key
        html << inline_toc_items(val, false)
        html << "</li>"
      end
    end
    html.join("\n")
  end

  # jump_to method returns a list of optgroup and option tags based on the context
  # context argument is a Hash or Array of jump to items
  def jump_to(context)
    options = []
    if context.kind_of?(String)
      nav_link_reg = /^(.+)#([^#]+)$/
      link_title = context
      link = if context.match(nav_link_reg)
        link_title, link_id = context.match(nav_link_reg)[1..2]
        link_id
      else
        link_title.downcase
      end
      link = link.gsub(/\s/,'-')
      options << "<option id=\"anchor-#{link}\">#{html_escape(link_title)}</option>"
    elsif context.kind_of?(Array)
      context.each do |item|
        options << jump_to(item)
      end
    elsif context.kind_of?(Hash)
      context.each do |key, val|
        options << "<optgroup label='#{html_escape(key.to_s)}'>"
        options << jump_to(val)
        options << "</optgroup>"
      end
    end
    options.join("\n")
  end
end

include NavHelper if defined?(Nanoc)
