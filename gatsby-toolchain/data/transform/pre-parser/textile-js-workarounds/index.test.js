const textile = require("textile-js");
const { compressMultipleNewlinesInLists, manuallyReplaceHTags } = require(".");
const {
    definitionList,
    expectedDefinitionList,
    nestedH1_6String,
    nestedH1_6Html,
    nestedDiv,
    spanWithHashExample,
    spanWithHashResult,
    listDivExample,
    listDivParsedExample
} = require('./workarounds.raw.examples');
const { preParser } = require('../');

describe('Reads a definition string correctly', () => {
    it('A definition string is rendered into a valid HTML definition list from textile', () => {
        expect(textile(compressMultipleNewlinesInLists(definitionList)).replace(/\s/g, '')).toEqual(expectedDefinitionList.replace(/\s/g, ''));
    });
});


describe('Reads an h[1-6]. string correctly', () => {
    it('An h[1-6]. line nested inside an outer HTML tag gets read correctly in textile', () => {
        expect(textile(manuallyReplaceHTags(nestedH1_6String))).toEqual(nestedH1_6Html);
    });
});

describe('Reads nested divs correctly', () => {
    it('A nested div gets read correctly after preParse operations', () => {
        const processedDivs = textile(preParser(nestedDiv));
        const firstDiv = processedDivs.split('\n')[1];
        expect(firstDiv).toEqual(`<div lang=\"default\">`);
    });
});

describe('Reads spans with hashes correctly', () => {
    it('A span with a hash/pound/octothorpe value gets read correctly', () => {
        const processedSpan = textile(preParser(spanWithHashExample));
        expect(processedSpan).toEqual(spanWithHashResult);
    });
});

describe('Reads divs closing over a definition list correctly', () => {
    it('A series of one or more divs followed by another div gets parsed correctly', () => {
        const preParsedDivs = preParser(listDivExample);
        const processedDivs = textile(preParsedDivs);
        expect(processedDivs.replace(/\s/g, '')).toEqual(listDivParsedExample.replace(/\s/g, ''));
    });
})