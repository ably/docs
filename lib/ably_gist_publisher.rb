class AblyGistPublisherFilter < Nanoc::Filter
  identifier :ably_gist_publisher
  type :text

  def run(content, params = {})
    if !Gists::gist_id_from_content(content)
      path = @item.path.gsub('/code/','').gsub(/\/$/,'')
      puts "Publishing a new Gist for #{path}"
      new_item_id = Gists::publish_gist path, content
      puts "Published new Gist for #{path} at https://gist.github.com/#{new_item_id}"
    end
  end
end