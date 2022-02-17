import * as fc from 'fast-check';
import { convertBlangBlocksToTokens } from '../pre-parser/language';
import { brokenBlangExample, brokenBlangTokenExpectedResult } from '../pre-parser/language/blang.raw.examples';
import { convertBlangBlocksToHtml } from "./blang";

const createRelevantString = (content, {
    language = 'javascript',
    isBlang = false,
    outerTag = false,
    innerTag = false
}) => {
    // This could be returned by the arrow function directly, but causes havoc with linters!
    return `${outerTag ? "<p>" : ""}
        ${isBlang ? `{{LANG_BLOCK[${language}]}}` : ""}
            ${innerTag ? "<div>" : ""}${content}${innerTag ? "</div>" : ""}
        ${isBlang ? "{{/LANG_BLOCK}}" : ""}
    ${outerTag ? "</p>" : ""}`;
};

const alphaNumericString = fc.asciiString({minLength:1}).map(str => str.replace(/[^a-zA-Z0-9]/g,'a'));


describe('Converts Blang strings to HTML', () => {
    // Single checks
    it('Leaves single non-blang strings alone', () => {
        const nonBlangString = createRelevantString('Lorem ipsum adipiscitor', {
            isBlang: false,
            outerTag: true,
            innerTag: true
        });
        const result = convertBlangBlocksToHtml(nonBlangString);
        expect(result).toEqual(nonBlangString);
    });
    it('Converts single Blang blocks to HTML', () => {
        const blangBlock = createRelevantString('Lorem ipsum adipiscitor', {
            isBlang: true,
            outerTag: true,
            innerTag: true
        });
        const result = convertBlangBlocksToHtml(blangBlock);
        expect(result).toEqual(`<div lang="javascript"><!-- start javascript language block --><div>Lorem ipsum adipiscitor</div></div><!-- /end javascript language block -->`);
    });
    it('Converts broken Blang block while keeping multiple languages separate', () => {
        // cf. data/transform/pre-parser/language/conversions.test.js
        const tokenizedBlock = convertBlangBlocksToTokens(brokenBlangExample);
        const result = convertBlangBlocksToHtml(tokenizedBlock);
        expect(result.replace(/\s+/g,'')).toEqual(brokenBlangTokenExpectedResult.replace(/\s+/g,''));
    });

    // Fastcheck property testing
    it('Never interferes with a non-blang string', () => {
        fc.assert(fc.property(
            fc.string(), fc.string(), fc.boolean(), fc.boolean(),
            (content, language, innerTag, outerTag) => {
                const nonBlangString = createRelevantString(content, {
                    isBlang: false,
                    outerTag,
                    innerTag,
                    language
                });
                const result = convertBlangBlocksToHtml(nonBlangString);
                expect(result).toEqual(nonBlangString);
            }
        ));
    });
    it('Always replaces a blang block with HTML', () => {
        fc.assert(fc.property(
            fc.string(), alphaNumericString, fc.boolean(),
            (content, language, outerTag) => {
                const blangBlock = createRelevantString(content, {
                    isBlang: true,
                    outerTag,
                    innerTag: false,
                    language
                });
                const result = convertBlangBlocksToHtml(blangBlock);
                expect(result).toEqual(`<div lang="${language}"><!-- start ${language} language block -->${content.trim()}</div><!-- /end ${language} language block -->`);
            }
        ))
    })
});
