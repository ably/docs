module PartialHelper
  def partial(path, indent: 0, skip_first_indent: true)
    path = path.prepend('/') if !path.start_with? '/'

    constructed_partial = @items["/partials" + path + '.*'].compiled_content
    ERB.new(constructed_partial.split(/\n/).each_with_index.map do |line, index|
      if indent == 0 || (index == 0 && skip_first_indent)
        line
      else
        "#{' ' * indent}#{line}"
      end
    end.join("\n")).result(page_vars)
  end

  def page_vars
    b = binding
    b.local_variable_set(:item, @item)
    b.local_variable_set(:items, @items)
    b
  end
end

include PartialHelper if defined?(Nanoc)
