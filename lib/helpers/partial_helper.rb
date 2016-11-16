module PartialHelper
  def partial(path, indent: 0, skip_first_indent: true)
    content_path = File.expand_path('../../../content', __FILE__)
    path = File.join(content_path, "#{path}#{File.extname(item.raw_filename)}")
    raise "Partial #{path} was not found" unless File.exists?(path)

    ERB.new(File.read(path).split(/\n/).each_with_index.map do |line, index|
      if indent == 0 || (index == 0 && skip_first_indent)
        line
      else
        "#{' ' * indent}#{line}"
      end
    end.join("\n")).result
  end
end

include PartialHelper if defined?(Nanoc)
