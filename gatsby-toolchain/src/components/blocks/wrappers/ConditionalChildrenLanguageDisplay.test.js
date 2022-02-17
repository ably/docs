import React from 'react';
import TestRenderer from 'react-test-renderer';
import cheerio from 'cheerio';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import textile from 'textile-js';
import { htmlParser, liftLangAttributes } from '../../../../data/html-parser';
import { postParser } from '../../../../data/transform/post-parser';
import { preParser } from '../../../../data/transform/pre-parser';
import ConditionalChildrenLanguageDisplay from './ConditionalChildrenLanguageDisplay';
import blocksFromData from '../blocks-from-data';

const rawData = `
- <div lang="jsall">callback</div> := is a function of the form @function(err)@ which is called upon completion
- <div lang="java">listener</div> := Listener to be notified on completion<br>__Type: "@CompletionListener@":#completion-listener__
- <div lang="csharp">callback</div> := is an action of the form @Action<bool, ErrorInfo>@ which is called upon completion
- <div lang="ruby">&block</div> := yields upon successfully publishing the message
- <div lang="objc,swift">callback</div> := called upon publishing the message, or with an error
`;

const twoChildrenInstance = TestRenderer.create(<ConditionalChildrenLanguageDisplay>
    {blocksFromData([{
        'name': 'span',
        'data': 'content',
        'attribs': { lang: DEFAULT_LANGUAGE }
    }, {
        'name': 'span',
        'data': 'alternative',
        'attribs': { lang: 'javascript' }
    }])}
</ConditionalChildrenLanguageDisplay>).root;

const sameLanguageTwoChildrenInstance = TestRenderer.create(<ConditionalChildrenLanguageDisplay>
    {blocksFromData([{
        'name': 'span',
        'data': 'content',
        'attribs': { lang: 'javascript' }
    }, {
        'name': 'span',
        'data': 'alternative',
        'attribs': { lang: 'javascript' }
    }])}
</ConditionalChildrenLanguageDisplay>).root;

describe('ConditionalChildrenLanguageDisplay only displays one child of alternatives', () => {
    it('A basic instance of two children with different lang attributes only shows the default language option', () => {
        expect(twoChildrenInstance.findAllByType('span').length).toBe(1);
    });

    it('Two different instances in a row shows both language options', () => {
        expect(sameLanguageTwoChildrenInstance.findAllByType('span').length).toBe(2);
    });
});

describe('Integration: ConditionalChildrenLanguageDisplay only displays one <dt><dd> pair of children from alternatives for parsed definition lists', () => {
    const parsedData = postParser(textile(preParser(rawData)));
    it('Text parser stage returns expected results', () => {
        expect(parsedData.replace(/\s/g,'')).toEqual(`<dl>
            <dt><div lang=\"javascript,nodejs\">callback</div></dt>
            <dd>is a function of the form <code>function(err)</code> which is called upon completion</dd>
            <dt><div lang=\"java\">listener</div></dt>
            <dd>Listener to be notified on completion<br /><i>Type: <a href=\"#completion-listener\"><code>CompletionListener</code></a></i></dd>
            <dt><div lang=\"csharp\">callback</div></dt>
            <dd>is an action of the form <code>Action&lt;bool, ErrorInfo&gt;</code> which is called upon completion</dd>
            <dt><div lang=\"ruby\">&amp;block</div></dt>
            <dd>yields upon successfully publishing the message</dd>
            <dt><div lang=\"objc,swift\">callback</div></dt>
            <dd>called upon publishing the message, or with an error</dd>
        </dl>`.replace(/\s/g,''));
    });

    // cf. lift-language-attributes.test.js
    // Included here to allow for easy debugging of which particular stage of the process is broken
    it('Lift language attributes stage returns expected results', () => {
        const loadedDom = cheerio.load(parsedData, null);
        liftLangAttributes(loadedDom);
        expect(loadedDom('body *').html().replace(/\s/g,'')).toEqual(`<div lang=\"javascript,nodejs\"><dt><div>callback</div></dt><dd>is a function of the form <code>function(err)</code> which is called upon completion</dd></div>
    	<div lang=\"java\"><dt><div>listener</div></dt><dd>Listener to be notified on completion<br><i>Type: <a href=\"#completion-listener\"><code>CompletionListener</code></a></i></dd></div>
    	<div lang=\"csharp\"><dt><div>callback</div></dt><dd>is an action of the form <code>Action&lt;bool, ErrorInfo&gt;</code> which is called upon completion</dd></div>
    	<div lang=\"ruby\"><dt><div>&amp;block</div></dt><dd>yields upon successfully publishing the message</dd></div>
    	<div lang=\"objc,swift\"><dt><div>callback</div></dt><dd>called upon publishing the message, or with an error</dd></div>
`.replace(/\s/g,''));
    });

    const htmlParsed = htmlParser(parsedData);
    it('HTML parser stage returns expected results', () => {    
        expect(htmlParsed[0].data[0].data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "attribs": {"lang": "nodejs"},
                    "name": "div",
                    "data": expect.arrayContaining([
                        expect.objectContaining({
                            "name": "dt"
                        }),
                        expect.objectContaining({
                            "name": "dd"
                        })
                    ])
                })
            ])
        );
    });

    it('ConditionalChildrenLanguageDisplay displays the expected results from HTML data', () => {
        const renderedData = TestRenderer.create(<ConditionalChildrenLanguageDisplay>
            {blocksFromData(htmlParsed)}
        </ConditionalChildrenLanguageDisplay>);
        const tree = renderedData.toJSON();
        expect(tree).toMatchSnapshot();
        expect(renderedData.root.findAllByType('dt').length).toBe(1);
        expect(renderedData.root.findAllByType('dd').length).toBe(1);
    });
});