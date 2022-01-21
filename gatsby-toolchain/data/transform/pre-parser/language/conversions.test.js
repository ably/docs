const { convertBlangBlocksToTokens } = require(".");
const { riskyBlangExample, riskyBlangExpectedResult } = require("./blang.raw.examples");

describe('Converts specific example blang blocks to HTML', () => {
    test('Converts example block taken from _connection_state.textile to HTML, discovered to be failing on 21/01/2022', () => {
        /**
         * Potential issues uncovered by test:
         * Problem:
         *      partial textile files aren't converted correctly
         * Solution:
         *      position must be able to be 0; make sure there's no falsy validation of position
         * Example of Cause:
         *      e.g. while(position && {condition}) ...
         * 
         * Problem:
         *      multiple subsequent LANG_BLOCKs can cause issues where they overlap:
         * Example of Problem:
         *      e.g. {{LANG_BLOCK[a]}}...{{LANG_BLOCK[b]}}{{/LANG_BLOCK}}...{{/LANG_BLOCK}}
         * Solution:
         *      make sure test/prod data is correct, this will happen if subsequent blang_blocks are indented
         * Example of Cause:
         *      blang[a]
         *          line one
         *          line two
         *      
         *          blang[b]
         *          line one
         *          line two
         * Notes:
         *      This is probably not the correct way to handle this behaviour, but it is definitely incorrect markup.
         *      Correct handling of undefined markup not a high priority during alpha development, but should revisit.
         */
        const result = convertBlangBlocksToTokens(riskyBlangExample);
        expect(result).toEqual(riskyBlangExpectedResult);
    });
});