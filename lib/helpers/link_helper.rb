module LinkHelper
  CANONICAL_ROOT = 'https://www.ably.io/' unless defined?(CANONICAL_ROOT)

  def link(text, target, attributes = {})
    target = "/#{target}" unless target.match(/^(\w+:\/\/|\/)/)
    link_to text, target, attributes
  end

  def canonical_link
    if item.identifier == '/'
      CANONICAL_ROOT
    else
      "#{CANONICAL_ROOT}documentation#{item.identifier.gsub("/root", "")}".gsub(%r{/$}, '')
    end
  end
end

include LinkHelper if defined?(Nanoc)
