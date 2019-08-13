class CompareTables
  COMPARE_PATH = 'data/compare.yaml' unless defined?(COMPARE_PATH)

  class << self
    attr_accessor :compare_data

    def create_compare_table(category, extra, competitors)
      number_of_competitors = competitors.length
      unless compare_data[category].nil?
        compare_table = create_compare_headers(category, extra, competitors)
        compare_table = compare_table.concat(create_compare_body(category, extra, competitors))
      end
    end

    def create_compare_headers(category, extra, competitors)
      compare_header = "|_. #{category} |"
      competitors.each do |competitor|
        compare_header.concat("_. #{company_name(competitor)} |")
      end
      unless extra.nil?
        compare_header.concat("_. #{extra} |")
      end
      compare_header.concat("\n")
    end

    def create_compare_body(category, extra, competitors)
      compare_body = ""
      compare_data[category].each do |name, line|
        if has_values?(line['compare'], competitors)
          compare_body = compare_body.concat("| *#{line['description']}* |")
          competitors.each do |competitor|
            compare_body = compare_body.concat(" #{line['compare'][competitor]} |")
          end
          unless extra.nil?
            compare_body = compare_body.concat(" #{line['extra']} |")
          end
          compare_body.concat("\n")
        end
      end
      compare_body.concat("<br/>\n")
    end

    def has_values?(comparisons, competitors)
      competitors.each do |competitor|
        if comparisons[competitor].nil?
          return false
        end
      end
    end

    def company_name(ref)
      compare_data['Companies'][ref]['name']
    end

    def company_url(ref)
      compare_data['Companies'][ref]['url']
    end
  end

  @compare_data = YAML::load(File.read(COMPARE_PATH))
end
