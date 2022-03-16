# Textile Workarounds

This folder is for functions that _only_ exist to workaround limitations of textile-js, or differences between textile-js and the Ruby implementation(s) of textile parsers.

Some other workarounds exist elsewhere in the codebase, for example in [white-space.js](../language/white-space.js). These will be commented separately.

All tests relating to ensuring the quirks of textile-js are accounted for are included here, please feel free to move them if you feel they would be more appropriate elsewhere.

`workarounds.raw.examples.js` contains useful examples that might throw up problematic HTML when parsed by textile.