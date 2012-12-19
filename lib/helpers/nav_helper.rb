module NavHelper
  def nav_items(section)
    results = []
    @items.select { |d| d[:section] == section }.each do |item|
      results << "<li><a href='#{html_escape(item.path)}'>#{html_escape(item[:title])}</a></li>"
    end
    results.join("\n")
  end
end

include NavHelper