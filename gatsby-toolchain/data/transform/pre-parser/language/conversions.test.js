const { convertBlangBlocksToTokens, convertJSAllToNodeAndJavaScript } = require(".");
const { riskyBlangExample, riskyBlangExpectedResult, brokenBlangExample, brokenBlangExpectedResult, brokenBlangTokenAfterJSConversionExpectedResult } = require("./blang.raw.examples");

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
    test('Converts example block taken from _channel_options.textile to HTML, discovered to be failing on 04/02/2022', () => {
        const result = convertBlangBlocksToTokens(brokenBlangExample);
        expect(result.replace(/\s+/g,'')).toEqual(brokenBlangExpectedResult.replace(/\s+/g,''));
    });
});

describe('Converts jsall to javascript, nodejs', ()=> {
    test('Converts simple <span lang="jsall"> element to <span lang="javascript,nodejs">', () => {
        /**
         * Potential issues uncovered by test:
         * Problem:
         *      Languages aren't joined together correctly by the replacer
         * Solution:
         *      Ensure commas are in the correct place, jsall is supported in any list location
         */
        const result = convertJSAllToNodeAndJavaScript('<span lang="jsall">');
        expect(result).toEqual('<span lang="javascript,nodejs">');
    });
    test('Converts lists beginning `jsall:` to `javascript,nodejs:`', () => {
        const result = convertJSAllToNodeAndJavaScript(`  jsall: Lorem ipsum`);
        expect(result).toEqual('  javascript,nodejs: Lorem ipsum');
    });
    test('Converts enclosures containing `jsall` to `[...,javascript,nodejs,...]', () => {
        const result = convertJSAllToNodeAndJavaScript('blang[java,jsall,csharp]');
        expect(result).toEqual('blang[javascript,nodejs,java,csharp]');
    });
    test('Converts example block taken from _channel_options.textile to multiple languages, discovered to be failing on 04/02/2022', () => {
        /**
         * Potential issues uncovered by test:
         * Problem:
         *      Multiple languages in blang blocks were being merged into one
         * Solution:
         *      Removing commas from subsequent languages wasn't being handled properly. Using a more robust method
         *      (splitting on commas and filtering on null), multiple consequent commas can be ignored in a better way
         */
        const result = convertJSAllToNodeAndJavaScript(brokenBlangExample);
        expect(result.replace(/\s+/g,'')).toEqual(brokenBlangTokenAfterJSConversionExpectedResult.replace(/\s+/g,''));
    });
})