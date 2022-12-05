import { fixLeadingHtmlTags } from './fix-leading-html-tags';

describe('Fixes leading inline HTML tags by replacing them with paragraph wrappers ahead of time.', () => {
  it('Ensures bold HTML tags are supplmented by being wrapped in paragraph tags', () => {
    expect(fixLeadingHtmlTags('*Note*: Lorem ipsum API content API')).toBe(
      '<p>*Note*: Lorem ipsum API content API</p>',
    );
  });
});
