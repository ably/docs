import { expectAccessibility } from 'src/utilities/test/expect-accessibility';
import PageTitle from './PageTitle';

describe('Basic accessibility test for PageTitle', () => {
  it('is accessible', () => {
    expectAccessibility(<PageTitle>Lorem Ipsum</PageTitle>);
  });
});
