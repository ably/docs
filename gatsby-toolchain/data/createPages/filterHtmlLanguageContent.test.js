import * as fc from 'fast-check';
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

const makeCompoundHtml = simpleHtmlObject => ({
    ...simpleHtmlObject,
    data: [simpleHtmlObject, simpleHtmlObject, simpleHtmlObject],
    attribs: {
        lang: DEFAULT_LANGUAGE + simpleHtmlObject.attribs.lang
    }
});

const genSimpleHtmlDataObject = fc.string()
    .map(makeSimpleHtml);

const genCompoundHtmlDataObject = genSimpleHtmlDataObject.map(makeCompoundHtml);

const set = new Set();

beforeEach(() => set.clear());

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

    test('Any generated simple single HTML elements are correctly filtered and KEPT', () => {
        fc.assert(
            fc.property(genSimpleHtmlDataObject,
                simpleObject => {
                    const result = filterHtmlLanguageContent(set,simpleObject.attribs.lang)
                        (simpleObject);
                    expect(result).toEqual(simpleObject);
                    expect(set.size).toEqual(0);
                }
            ).beforeEach(() => set.clear())
        );
    });
    test('Any generated simple single HTML elements are correctly filtered and REMOVED', () => {
        fc.assert(
            fc.property(genSimpleHtmlDataObject, fc.string({minLength:1}),
                (simpleObject, str) => {
                    const result = filterHtmlLanguageContent(set,`${simpleObject.attribs.lang}${str}`)
                        (simpleObject);
                    expect(result).toEqual(null);
                    expect(set.size).toEqual(1);
                    expect(set.has(simpleObject.attribs.lang)).toBe(true);
                }
            ).beforeEach(() => set.clear())
        );
    });

    test('Any generated compound HTML elements are correctly filtered and REMOVED', () => {
        fc.assert(
            fc.property(genCompoundHtmlDataObject,
                compoundObject => {
                    const result = filterHtmlLanguageContent(set,compoundObject.attribs.lang)
                        (compoundObject);
                    expect(result).not.toEqual(null);
                    expect(result).toEqual({
                        ...compoundObject,
                        data: []
                    });
                    expect(set.size).toEqual(1);
                    expect(set.has(compoundObject.data[0].attribs.lang)).toBe(true);
                }
            ).beforeEach(() => set.clear())
        )
    });
});