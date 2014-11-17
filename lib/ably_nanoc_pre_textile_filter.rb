require_relative './ably_pre_textile_filter'

class AblyNanocPreTextileFilter < Nanoc::Filter
  identifier :ably_nanoc_pre_textile
  type :text

  def run(content, params = {})
    AblyPreTextileFilter.run(content, @item.path)
  end
end
