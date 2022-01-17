import * as fc from 'fast-check';
const { sample } = require('lodash');
const HtmlDataTypes = require('../types/html');
const { filterHtmlLanguageContent, DEFAULT_LANGUAGE } = require('./createPageVariants');

const simpleHtmlDataObject = {
    data: [],
    type: HtmlDataTypes.tag,
    name: HtmlDataTypes.dl,
    attribs: {
        lang: DEFAULT_LANGUAGE
    }
}

const makeSimpleHtml = language => ({
    ...simpleHtmlDataObject,
    attribs: {
        lang: language
    }
});

const randSimpleHtmlDataObject = fc.string()
    .map(makeSimpleHtml);

const set = new Set();

beforeEach(() => {
    set.clear
});

describe('Data objects parsed from HTML should be filtered against the provided language', () => {
    test('A simple single HTML element is correctly filtered and KEPT', () => {
        const result = filterHtmlLanguageContent(set)(simpleHtmlDataObject);
        expect(result).toEqual(simpleHtmlDataObject);
        expect(set.size).toEqual(0);
    });
    test('A simple single HTML element is correctly filtered and REMOVED', () => {
        const result = filterHtmlLanguageContent(set)
            (makeSimpleHtml('javascript'));
        expect(result).toEqual(null);
        expect(set.size).toEqual(1);
        expect(set.has('javascript')).toBe(true);
    })
});