import * as fc from 'fast-check';
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
    test('Leaves single non-blang strings alone', () => {
        const nonBlangString = createRelevantString('Lorem ipsum adipiscitor', {
            isBlang: false,
            outerTag: true,
            innerTag: true
        });
        const result = convertBlangBlocksToHtml(nonBlangString);
        expect(result).toEqual(nonBlangString);
    });
    test('Converts single Blang blocks to HTML', () => {
        const blangBlock = createRelevantString('Lorem ipsum adipiscitor', {
            isBlang: true,
            outerTag: true,
            innerTag: true
        });
        const result = convertBlangBlocksToHtml(blangBlock);
        expect(result).toEqual(`

<div lang="javascript"><!-- start javascript language block -->

            <div>Lorem ipsum adipiscitor</div>
        
</div><!-- /end javascript language block -->

`);
    });

    // Fastcheck property testing
    test('Never interferes with a non-blang string', () => {
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
    test('Always replaces a blang block with HTML', () => {
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
                expect(result).toEqual(`

<div lang="${language}"><!-- start ${language} language block -->

            ${content}
        
</div><!-- /end ${language} language block -->

`)
            }
        ))
    })
});
