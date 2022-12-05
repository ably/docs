const { languageReplacer } = require('./language-map');

describe('Converts language list ERB to a list of languages', () => {
  it('Converts a real example of a language list ERB to a list of languages', () => {
    const sampleText = `For all code blocks, a language in lowercase must be specified.  Languages currently supported are <%= Ably::DOCUMENTATION_LANGUAGES.map { |lang_id, lang| "@#{lang_id}@" }.join(', ') %>.  A code block must be prefixed and suffixed with a line break, and must use the following syntax:`;
    const expectedResult = `For all code blocks, a language in lowercase must be specified.  Languages currently supported are @javascript@, @java@, @android@, @kotlin@, @python@, @php@, @ruby@, @nodejs@, @typescript@, @objc@, @swift@, @go@, @csharp@, @cplusplus@, @flutter@, @c@, @css@, @appcelerator@, @phonegap@, @curl@, @html@, @json@, @sh@, @yaml@.  A code block must be prefixed and suffixed with a line break, and must use the following syntax:`;
    expect(languageReplacer(sampleText)).toBe(expectedResult);
  });
});
