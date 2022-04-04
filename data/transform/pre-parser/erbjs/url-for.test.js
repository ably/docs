import { urlforReplacer } from './url-for';

describe('Replaces JSBin urlfor ERB strings with links', () => {
  it('Replaces a real example of a JSBin urlfor ERB string', () => {
    const sampleText = `bc[text]. "(external) Example":<%= JsBins.url_for('client-lib-development-guide/example') %>`;
    const expectedResult = `bc[text]. "(external) Example":https://jsbin.ably.com:443/ohidar/latest_?javascript,live`;
    expect(urlforReplacer(sampleText)).toBe(expectedResult);
  });
});
