const textile = require("textile-js");
const { compressMultipleNewlinesInLists, manuallyReplaceHTags } = require(".");
const {
    definitionList,
    expectedDefinitionList,
    nestedH1_6String,
    nestedH1_6Html,
    nestedDiv
} = require('./workarounds.raw.examples');
const { preParser } = require('../');

describe('Reads a definition string correctly', () => {
    test('A definition string is rendered into a valid HTML definition list from textile', () => {
        expect(textile(compressMultipleNewlinesInLists(definitionList)).replace(/\s/g, '')).toEqual(expectedDefinitionList.replace(/\s/g, ''));
    });
});


describe('Reads an h[1-6]. string correctly', () => {
    test('An h[1-6]. line nested inside an outer HTML tag gets read correctly in textile', () => {
        expect(textile(manuallyReplaceHTags(nestedH1_6String))).toEqual(nestedH1_6Html);
    });
});

describe('Reads nested divs correctly', () => {
    test('A nested div gets read correctly after preParse operations', () => {
        const processedDivs = textile(preParser(nestedDiv));
        const firstDiv = processedDivs.split('\n')[1];
        expect(firstDiv).toEqual(`<div lang=\"default\">`);
    });
})