import React from 'react';
import TestRenderer from 'react-test-renderer';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { Span } from '../dividers';
import ConditionalChildrenLanguageDisplay from './ConditionalChildrenLanguageDisplay';

const twoChildrenInstance = TestRenderer.create(<ConditionalChildrenLanguageDisplay>
    <Span data='content' attribs={{ lang: DEFAULT_LANGUAGE }}/>
    <Span data='alternative' attribs={{ lang: 'javascript' }}/>
</ConditionalChildrenLanguageDisplay>).root;

describe('ConditionalChildrenLanguageDisplay only displays one child of alternatives', () => {
    test('A basic instance of two children with different lang attributes only shows the default language option', () => {
        expect(twoChildrenInstance.findAllByType(Span).length).toBe(1);
    });
});