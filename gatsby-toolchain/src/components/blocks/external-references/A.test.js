import { A } from '.';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Link } from 'gatsby';

const gatsbyRootElement = <A data={'Lorem ipsum'} attribs={{ href: 'https://www.ably.com/documentation/lorem' }}/>;
const normalRootElement = <A data={'Lorem ipsum'} attribs={{ href: 'https://www.example.com' }}/>;

describe('Different data provided to link elements results in different components', () => {
    const gatsbyRootElementRenderer = TestRenderer.create(gatsbyRootElement);
    test('Successfully renders Gatsby links', () => {
        expect(gatsbyRootElementRenderer.toJSON()).toMatchSnapshot();
    });
    test('Contains a Gatsby Link', () => {
        expect(() => gatsbyRootElementRenderer.root.findByType(Link)).not.toThrow();
    })
    const normalRootElementRenderer = TestRenderer.create(normalRootElement);
    test('Successfully renders normal links', () => {
        expect(normalRootElementRenderer.toJSON()).toMatchSnapshot();
    });
    test('Contains a normal Link', () => {
        expect(() => gatsbyRootElementRenderer.root.findByType('a')).not.toThrow();
    })
});