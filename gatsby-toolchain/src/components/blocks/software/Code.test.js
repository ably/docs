import React from 'react';
import { Code } from '.';
import TestRenderer, { act } from 'react-test-renderer';

const codeRootElement = (
  <Code data={[{ data: 'var useVars = false;', type: 'text' }]} attribs={{ lang: 'javascript' }} />
);

describe('Different langs provided to Code elements results in different rendering', () => {
  const codeRootElementRenderer = TestRenderer.create(codeRootElement);
  const codeJSON = codeRootElementRenderer.toJSON();
  it('Successfully renders Code elements with language', () => {
    expect(codeJSON).toMatchSnapshot();
  });
  act(() => {
    codeRootElementRenderer.update(
      <Code data={[{ data: 'This is pseudocode, honest', type: 'text' }]} attribs={{ lang: null }} />,
    );
  });
  const codeWithoutLanguageJSON = codeRootElementRenderer.toJSON();
  it('Successfully renders Code elements without language', () => {
    expect(codeWithoutLanguageJSON).toMatchSnapshot();
  });
  it('Looks different to a Code element with a language', () => {
    expect(codeWithoutLanguageJSON).not.toEqual(codeJSON);
  });
  it('Does not contain any non-code children', () => {
    expect(codeRootElementRenderer.root.findAllByType('code')).toHaveLength(1);
    expect(
      codeRootElementRenderer.root.findAll((elem) => {
        elem.type !== 'code';
      }),
    ).toHaveLength(0);
  });
});
