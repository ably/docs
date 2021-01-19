module LinkHelper
  CANONICAL_ROOT = 'https://www.ably.io/' unless defined?(CANONICAL_ROOT)
  DOCS_ROOT = 'https://docs.ably.com/' unless defined?(DOCS_ROOT)

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

  def image_url(image_path)
    return image_path if image_path.match(/^http/i)
    "#{DOCS_ROOT}#{image_path.gsub(%r{^/}, '')}"
  end
end

include LinkHelper if defined?(Nanoc)
