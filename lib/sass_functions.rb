require 'sass'
require File.expand_path('../documentation_languages', __FILE__)

module Sass::Script::Functions
  def language_name(id)
    assert_type id, :String
    Sass::Script::String.new(Ably::DOCUMENTATION_LANGUAGES[id.to_s][:name])
  end
  declare :language_name, :args => [:string]

  def language_ids
    keys = Ably::DOCUMENTATION_LANGUAGES.keys.map { |d| Sass::Script::String.new(d) }
    Sass::Script::List.new(keys, :comma)
  end
end