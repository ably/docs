class AblyJsBinPublisherFilter < Nanoc::Filter
  identifier :ably_jsbin_publisher
  type :text

  def run(content, params = {})
    if !JsBins::jsbin_id_from_content(content)
      path = @item.path.gsub('/code/','').gsub(/\/$/,'')
      puts "\nPublishing a new JsBin for #{path}"
      new_bin = JsBins::publish_jsbin(path, content)
      puts "Published new JsBin for #{path} at #{new_bin[:url]}"
    end
  end
end