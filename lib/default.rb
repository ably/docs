# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

require 'pry'
require 'pry-byebug'

include Nanoc::Helpers::LinkTo
include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering
