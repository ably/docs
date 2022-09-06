import React from 'react';
import { render, screen } from '@testing-library/react';
import Code from '.';

describe('Code', () => {
  it('Renders Code elements with language', () => {
    render(<Code data={[{ data: 'This is pseudocode, honest', type: 'text' }]} attribs={{ lang: null }} />);
    // expect(screen.get).toMatchSnapshot();
  });

  // it('Renders Code elements without language', () => {
  //   expect(codeWithoutLanguageJSON).toMatchSnapshot();
  // });

  // it('Updates the codeblock when language is switched', () => {
  // render
  // expect snapshot
  // click on language button
  // expect snapshot
  // });

  // it('Does not contain any non-code children', () => {
  //   expect(codeRootElementRenderer.root.findAllByType('code')).toHaveLength(1);
  //   expect(
  //     codeRootElementRenderer.root.findAll((elem) => {
  //       elem.type !== 'code';
  //     }),
  //   ).toHaveLength(0);
  // });

  // it('Copies elements onClick of copy button', () => {
  // render
  // click copy button
  // expect clipboard to have been called with correct value (or to have a copy??)
  // });
});
