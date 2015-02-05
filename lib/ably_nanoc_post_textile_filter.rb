require_relative './ably_post_textile_filter'

class AblyNanocPostTextileFilter < Nanoc::Filter
  identifier :ably_nanoc_post_textile
  type :text

  def run(content, params = {})
    AblyPostTextileFilter.run(content, @item.path)
  end
end
