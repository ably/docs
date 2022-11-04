import { duplicateLanguageBlocks } from '.';
import { duplicateLanguageBlock } from './duplicate-blocks';

const langBlockExpected = `h1[javascript](exampleClass). Some content`;

describe('Given the data for a single language block, constructs a valid output', () => {
  it('Creates a valid output block', () => {
    expect(duplicateLanguageBlock('h1', 'exampleClass', 'Some content')('javascript')).toEqual(langBlockExpected);
  });
});

const bcTest = `bc[javascript,csharp].
Some content

`;
const bcExpected = `bc[javascript]. Some content

bc[csharp]. Some content

`;

const h1SingleLanguageTest = `h1[javascript]. Some content

`;

describe('Given a valid language block with multiple entries ([lang1, lang2]), creates multiple language blocks ([lang1][lang2])', () => {
  it('Works on bc p or h language blocks', () => {
    const result = duplicateLanguageBlocks(bcTest);
    expect(result).toEqual(bcExpected);
  });
  it('Leaves single blocks unchanged', () => {
    const result = duplicateLanguageBlocks(h1SingleLanguageTest);
    expect(result).toEqual(h1SingleLanguageTest);
  });
});
