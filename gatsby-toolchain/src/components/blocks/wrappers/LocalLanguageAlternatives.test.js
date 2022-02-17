import React from 'react';
import TestRenderer from 'react-test-renderer';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import LocalLanguageAlternatives from './LocalLanguageAlternatives';

const rootElement = <LocalLanguageAlternatives
data={{
    'javascript': [
        {
            "data": [
                {
                    "data": "This is JavaScript.",
                    "type": "text",
                    "name": "text"
                }
            ],
            "type": "tag",
            "name": "code",
            "attribs": {
                "lang": "javascript"
            }
        }
    ],
    'ruby': [
        {
            "data": [
                {
                    "data": "This is Ruby.",
                    "type": "text",
                    "name": "text"
                }
            ],
            "type": "tag",
            "name": "code",
            "attribs": {
                "lang": "ruby"
            }
        }
    ],
    'csharp': [
        {
            "data": [
                {
                    "data": "This is C#.",
                    "type": "text",
                    "name": "text"
                }
            ],
            "type": "tag",
            "name": "code",
            "attribs": {
                "lang": "csharp"
            }
        }
    ]
}}
language={DEFAULT_LANGUAGE}
languages={['javascript','ruby','csharp']}
>
This is default content.
</LocalLanguageAlternatives>;

const languageAlternativesRenderer = TestRenderer.create(rootElement);

const languageAlternativesInstance = languageAlternativesRenderer.root;

// Source: https://stackoverflow.com/questions/34204975/react-is-there-something-similar-to-node-textcontent
const getNodeText = node => {
    if (['string', 'number'].includes(typeof node)) return node
    if (node instanceof Array) return node.map(getNodeText).join('')
    if (typeof node === 'object' && node) return getNodeText(node.props.children)
  };

describe('LocalLanguageAlternatives displays statically as expected', () => {
    it('Snapshot of LocalLanguageAlternatives is the same', () => {
        expect(languageAlternativesRenderer.toJSON()).toMatchSnapshot();
    });
    it('Contains default content', () => {
        expect(getNodeText(languageAlternativesInstance)).toEqual('This is default content.');
    });
});
