module LanguageHelper
  def language_spec
    if @item[:languages]
      # User has requested that only particular languages are displayed in the nav
      # This is needed because sometimes types included in a page may include other
      # langauge definitions not suitable for the current page and as such
      # language detection breaks
      js = "window.NavLangs=[#{@item[:languages].map { |lang| %{"#{lang}"} }.join(',')}];"
      %{<script type="text/javascript">#{js}</script>}
    end
  end
end

include LanguageHelper if defined?(Nanoc)
