import HtmlDataTypes from "../types/html";
import createContentMenuDataFromPage, { idFromName, getTextFromPage } from "./createContentMenuDataFromPage";

describe('IDs of form `word1-word2-word3` are generated from names of form `Word1Word2 Word3`', () => {
    test('Non-matching names are not altered', () => {
        expect(idFromName(`word1-word2-word3`)).toEqual(`word1-word2-word3`);
    });
    test('IDs are created correctly', () => {
        expect(idFromName(`Word1Word2 Word3`)).toEqual(`word1-word2-word3`);
    });
});

const simpleTestDataObject = {
    data: 'Hello World'
};

const nestedDataObject = {
    data: [
    {
        data: 'Hello World'
    },
    {
        data: [
            {
                data: 'It\'s a song'
            },
            {
                data: 'that we\'re singing'
            }
        ]
    },
    {
        data: 'cmon get happy'
    }]
}

describe('Text is retrieved recursively from data objects representing HTML pages', () => {
    test('A simple data object has the text retrieved', () => {
        expect(getTextFromPage(simpleTestDataObject)).toEqual(['Hello World']);
    });
    test('A nested data object has the text retrieved in the expected order', () => {
        expect(getTextFromPage(nestedDataObject)).toEqual(['Hello World','It\'s a song','that we\'re singing','cmon get happy']);
    });
});

const h2DataObjectWithID = {
    data: 'Hello World',
    type: HtmlDataTypes.h2,
    attribs: { id: 'override' }
};

const simpleH2DataObject = {
    data: 'Hello World',
    type: HtmlDataTypes.h2
};

const simpleH3DataObject = {
    data: 'Hello World',
    type: HtmlDataTypes.h3
};

const nestedDataObjectWithMenuItems ={
    data: [
        simpleH2DataObject,
        {
            data: Array(4).fill(simpleH3DataObject)
        },
        {
            data: Array(4).fill(simpleH2DataObject)
        },
        simpleH3DataObject
    ]
};

const expectedH2MenuItem = {
    "id": "hello-world",
    "level": 2,
    "name": "Hello World",
};

const expectedH3MenuItem = {
    "id": "hello-world",
    "level": 3,
    "name": "Hello World",
};

const noIDNestedH2Item = {
    data: [
        {
            data: 'Hello World'
        },
        {
            data: 'Highlighted Text',
            type: HtmlDataTypes.span
        },
        {
            data: 'End transmission',
        }
    ],
    type: HtmlDataTypes.h2
};

describe('Content menu data is retrieved recursively from data objects representing HTML pages', () => {
    test('A simple data object has no menu items received', () => {
        expect(createContentMenuDataFromPage(simpleTestDataObject)).toEqual([]);
    });
    test('Existing IDs are preserved', () => {
        expect(createContentMenuDataFromPage(simpleH2DataObject)).toEqual([expectedH2MenuItem]);
    });
    test('A simple h2 or h3 data object receives one menu item', () => {
        expect(createContentMenuDataFromPage(simpleH2DataObject)).toEqual([expectedH2MenuItem]);
        expect(createContentMenuDataFromPage(simpleH3DataObject)).toEqual([expectedH3MenuItem]);
    });

    test('A nested h2 or h3 data object receives multiple menu items, in order, as appropriate', () => {
        expect(createContentMenuDataFromPage(nestedDataObjectWithMenuItems)).toEqual([
            expectedH2MenuItem,
            expectedH3MenuItem, expectedH3MenuItem, expectedH3MenuItem, expectedH3MenuItem,
            expectedH2MenuItem, expectedH2MenuItem, expectedH2MenuItem, expectedH2MenuItem,
            expectedH3MenuItem
        ]);
    });

    test('IDs are constructed as expected for H2s with an ID', () => {
        expect(createContentMenuDataFromPage(h2DataObjectWithID)).toEqual([{
            "id": "override",
            "level": 2,
            "name": "Hello World"
        }]);
    });

    test('IDs are constructed as expected for nested H2 elements without an ID', () => {
        expect(createContentMenuDataFromPage(noIDNestedH2Item)).toEqual([{
            "id": "hello-world-highlighted-text-end-transmission",
            "level": 2,
            "name": "Hello WorldHighlighted TextEnd transmission"
        }]);
    });
});
