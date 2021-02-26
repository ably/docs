module LinkHelper
  CANONICAL_ROOT = 'https://ably.com/' unless defined?(CANONICAL_ROOT)

  def link(text, target, attributes = {})
    target = "/#{target}" unless target.match(/^(\w+:\/\/|\/)/)
    link_to text, target, attributes
  end

  def canonical_link
    clean_item = item.identifier.without_exts.gsub(%r{index$}, '')
    if clean_item == '/'
      CANONICAL_ROOT
    else
      "#{CANONICAL_ROOT}documentation#{clean_item.gsub("/root", "")}".gsub(%r{/$}, '')
    end
  end
end

include LinkHelper if defined?(Nanoc)
