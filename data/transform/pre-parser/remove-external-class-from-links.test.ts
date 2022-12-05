import { removeExternalClassFromLinks } from './remove-external-class-from-links';

describe('test', () => {
  it('test', () => {
    expect(
      removeExternalClassFromLinks(
        `bc[text]. "(external) Example":<%= JsBins.url_for('client-lib-development-guide/example') %>`,
      ),
    ).toBe(`bc[text]. "Example":<%= JsBins.url_for('client-lib-development-guide/example') %>`);
  });
});
