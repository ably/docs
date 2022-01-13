import * as fc from 'fast-check';
import { cheerioNodeParser, cheerioParser, htmlParser } from ".";
import htmlString from '../../test-generators.js/html';
import HtmlDataTypes from '../types/html';

const buildExpectedFromTagArray = (tagArray, innerText) => tagArray.length === 0 ? [{
    data: innerText,
    type: HtmlDataTypes.text,
    name: HtmlDataTypes.text
}] : [{
    data: buildExpectedFromTagArray(tagArray.slice(1), innerText),
    type: HtmlDataTypes.tag,
    name: tagArray[0],
    attribs: Object.create(null)
}];

test('Valid HTML is capable of being interpreted into data objects in the correct format by the HTML parser', () => {
    fc.assert(
        fc.property(htmlString, ({ result, tagResult, innerText }) => {
            const [{data: actual}] = htmlParser(result);
            const expected = buildExpectedFromTagArray(tagResult, innerText);
            expect(expected).toEqual(actual);
        })
    )
});