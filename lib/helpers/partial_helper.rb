module PartialHelper
  def partial(path)
    content_path = File.expand_path('../../../content', __FILE__)
    path = File.join(content_path, "#{path}#{File.extname(item.raw_filename)}")
    raise "Partial #{path} was not found" unless File.exists?(path)

    File.read(path)
  end
end

include PartialHelper
