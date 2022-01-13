import * as fc from 'fast-check';
import _ from 'lodash';
import { cheerioNodeParser, htmlParser } from ".";
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

describe('Cheerio node parser transforms data as expected', () => {
    test('A single text node has no attributes', () => {
        const input = {
            children: [],
            attribs: {},
            data: "Lorem ipsum dolor sit mae adipiscing color",
            name: HtmlDataTypes.text,
            type: HtmlDataTypes.text,

        };
        const expected = {
            data: "Lorem ipsum dolor sit mae adipiscing color",
            name: HtmlDataTypes.text,
            type: HtmlDataTypes.text
        };
        const actual = cheerioNodeParser(null,input);
        expect(actual).toEqual(expected);
    });
    test('A node with children has them moved into the data property', () => {
        const input = {
            children: [{
                children: [],
                attribs: {},
                data: "Lorem ipsum dolor sit mae adipiscing color",
                name: "text",
                type: "text",
            }],
            attribs: {},
            type: HtmlDataTypes.tag,
            name: HtmlDataTypes.p
        };
        const expected = {
            data: [{
                data: "Lorem ipsum dolor sit mae adipiscing color",
                name: "text",
                type: "text"
            }],
            type: HtmlDataTypes.tag,
            name: HtmlDataTypes.p,
            attribs: {}
        };
        const actual = cheerioNodeParser(null, input);
        expect(actual).toEqual(expected);
    })
})

describe("HTML parsing into data objects works as expected", () => {
    // The behaviour of invalid HTML is defined by Cheerio and beyond the scope of this testing suite unless specific examples cause issues.
    test('A specific, known-valid piece of HTML is capable of being interpreted into data objects in the correct format by the HTML parser', () => {
        const validHtml = "<p>Lorem ipsum dolor sit mae adipiscing color</p>"+
            "<p>insertium paragraphicus <strong>loremitor</strong></p>"+
            "<div><span>A good example of some common text</span> with text both in and out of elements.</div>";
        const expected = [{
            attribs: {},
            data: [{
                data: "Lorem ipsum dolor sit mae adipiscing color",
                name: "text",
                type: "text"
            }],
            name: "p",
            type: "tag"
        }, {
            attribs: {},
            data: [{
                data: "insertium paragraphicus ",
                name: "text",
                type: "text"
            }, {
                attribs: {},
                data: [{
                    data: "loremitor",
                    name: "text", 
                    type: "text"
                }],
                name: "strong",
                type: "tag"
            }],
            name: "p",
            type: "tag"
        }, {
            attribs: {},
            data: [{
                attribs: {},
                data: [{
                    data: "A good example of some common text",
                    name: "text",
                    type: "text"
                }],
                name: "span",
                type: "tag"
            }, {
                data: " with text both in and out of elements.",
                name: "text",
                type: "text"
            }],
            name: "div",
            type: "tag"
        }];
        const [{data: actual}] = htmlParser(validHtml);
        expect(actual).toEqual(expected);
    });

    test('Arbitrary valid HTML is capable of being interpreted into data objects in the correct format by the HTML parser', () => {
        fc.assert(
            fc.property(htmlString, ({ result, tagResult, innerText }) => {
                const [{data: actual}] = htmlParser(result);
                const expected = buildExpectedFromTagArray(tagResult, innerText);
                expect(actual).toEqual(expected);
            })
        )
    });
});
