module LinkHelper
  def link(text, target, attributes = {})
    target = "/#{target}" unless target.match(/^(\w+:\/\/|\/)/)
    link_to text, target, attributes
  end
end

include LinkHelper