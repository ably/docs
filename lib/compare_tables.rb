class CompareTables
  COMPARE_PATH = 'data/compare.yaml' unless defined?(COMPARE_PATH)

  class << self
    attr_accessor :compare_data

    def create_compare_table(category, compare1, compare2, extra)
      unless compare_data[category].nil?
        compare_table = "|_. #{category} |_. #{compare1} |_. #{compare2} |"
        unless extra.nil?
          compare_table.concat("_. #{extra} |")
        end
        compare_table.concat("\n")
        compare_data[category].each do |name, value|
          compared_text1 = value['compare'][compare1]
          compared_text2 = value['compare'][compare2]
          unless compared_text1.nil? || compared_text2.nil?
            compare_table = compare_table.concat("| *#{value['description']}* | #{compared_text1} | #{compared_text2} |")
            unless extra.nil?
              compare_table = compare_table.concat(" #{value['extra']} |")
            end
            compare_table = compare_table.concat("\n")
          end
        end
        compare_table
      end
    end
  end

  @compare_data = YAML::load(File.read(COMPARE_PATH))
end
