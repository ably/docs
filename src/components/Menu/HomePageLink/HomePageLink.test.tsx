import { expectAccessibility } from 'src/utilities/test/expect-accessibility';
import { HomePageLink } from './HomePageLink';

describe('Basic accessibility test for PageTitle', () => {
  it('is accessible', () => {
    expectAccessibility(<HomePageLink />);
  });
});
