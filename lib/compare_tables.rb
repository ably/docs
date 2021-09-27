class CompareTables
  COMPARE_PATH = 'data/compare.yaml' unless defined?(COMPARE_PATH)

  class << self
    attr_accessor :compare_data

    def create_compare_table(category, extra, competitors)
      number_of_competitors = competitors.length
      compare_table = ''
      current_category = 0

      if disclaimers?(competitors)
        compare_table.concat(compare_data['Generic']['disclaimer']['top'])
      end

      unless compare_data[category].nil?
        compare_data[category].each do |name, section|
          compare_table = compare_table.concat(create_compare_headers(category, extra, section, competitors, current_category))
          compare_table = compare_table.concat(create_compare_body(category, extra, section, competitors))
          current_category = current_category + 1
        end
        compare_table.concat("<br/>\n\n")
      end

      if disclaimers?(competitors)
        competitors.filter { |competitor| disclaimer(competitor) }.each do |competitor|
          compare_table.concat(compare_data['Generic']['disclaimer']['bottom'])
        end
      end


      compare_table
    end

    def create_compare_headers(category, extra, section, competitors, current_category)
      compare_header = ""
      if current_category == 0
        compare_header = "|_. #{section['description']} |"
        competitors.each do |competitor|
          compare_header.concat("_. #{company_name(competitor)} |")
        end
        unless extra.nil?
          compare_header.concat("_. #{extra} |")
        end
      else
       compare_header = "|_. #{section['description']} |"
      end
      compare_header.concat("\n")
    end

    def create_compare_body(category, extra, section, competitors)
      compare_body = ""
      section['sections'].each do |name, line|
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
      compare_body
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

    def disclaimers?(refs)
      refs.any? { |ref| disclaimer(ref) }
    end

    def disclaimer(ref)
      compare_data['Companies'][ref]['disclaimer']
    end
  end

  @compare_data = YAML::load(File.read(COMPARE_PATH))
end
