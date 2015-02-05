class AblyPostTextileFilter
  class << self
    def run(content, path)
      add_github_line_breaks(content)
    end

    # Line breaks when using Github notation insert <br /> tags, replace them with actual HTML <br />
    def add_github_line_breaks(content)
      content.gsub('{{{github_br}}}', '<br/>')
    end
  end
end
