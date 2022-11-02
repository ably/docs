import { HtmlComponentProps } from 'src/components/html-component-props';
import HtmlDataTypes from '../../../../../data/types/html';
import { extractCodeStringsFromContent } from './extract-code-strings-from-content';

const TEXT_HTML_COMPONENT_PROP_OBJECT = {
  data: 'text.',
  type: HtmlDataTypes.text,
  name: HtmlDataTypes.text,
};

const CODE_HTML_COMPONENT_PROP_OBJECT = {
  data: 'Objective-C code',
  type: HtmlDataTypes.tag,
  name: HtmlDataTypes.code,
};

const wrapWithTag = (data: HtmlComponentProps<'code'>) => ({
  data: [data],
  type: HtmlDataTypes.tag,
  name: HtmlDataTypes.div,
});

describe('Extracting code strings from content provided to the Code element', () => {
  it('Does not interfere with a simple example of code content', () => {
    const simpleHtmlComponentProps = new Array(5).fill(TEXT_HTML_COMPONENT_PROP_OBJECT);
    expect(extractCodeStringsFromContent(simpleHtmlComponentProps)).toEqual([
      'text.',
      'text.',
      'text.',
      'text.',
      'text.',
    ]);
  });

  it('Extracts Objective C code and returns @ symbols to where they should go', () => {
    const nestedCodeHtmlComponentProps = [
      wrapWithTag(CODE_HTML_COMPONENT_PROP_OBJECT),
      TEXT_HTML_COMPONENT_PROP_OBJECT,
      wrapWithTag(CODE_HTML_COMPONENT_PROP_OBJECT),
      CODE_HTML_COMPONENT_PROP_OBJECT,
    ];
    expect(extractCodeStringsFromContent(nestedCodeHtmlComponentProps)).toEqual([
      '@Objective-C code@',
      'text.',
      '@Objective-C code@',
      '@Objective-C code@',
    ]);
  });
});
