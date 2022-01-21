const textile = require("textile-js");
const { compressMultipleNewlinesInLists, manuallyReplaceHTags } = require(".");
const {
    definitionList,
    expectedDefinitionList,
    nestedH1_6String,
    nestedH1_6Html
} = require('./workarounds.raw.examples');

describe('Reads a definition string correctly', () => {
    test('A definition string is rendered into a valid HTML definition list from textile', () => {
        expect(textile(compressMultipleNewlinesInLists(definitionList)).replace(/\s/g, '')).toEqual(expectedDefinitionList.replace(/\s/g, ''));
    });
});


describe('Reads an h[1-6]. string correctly', () => {
    test('An h[1-6]. line nested inside an outer HTML tag gets read correctly in textile', () => {
        expect(textile(manuallyReplaceHTags(nestedH1_6String))).toEqual(nestedH1_6Html);
    })
});