import textile from 'textile-js';
import { preParser } from '..';
import { postParser } from '../../post-parser';
import { makeImplicitOrderedListExplicit } from './make-implicit-ordered-list-explicit';

describe('Ensure that implicit ordered lists (decimal-led lines) are converted to explicit Textile ordered lists', () => {
  it('Interprets ordered lists correctly', () => {
    expect(
      makeImplicitOrderedListExplicit(`

Ably supports two methods of authentication:

1. "Basic authentication":/core-features/authentication#basic-authentication
2. "Token authentication":/core-features/authentication#token-authentication`),
    ).toBe(`

Ably supports two methods of authentication:

#  "Basic authentication":/core-features/authentication#basic-authentication
#  "Token authentication":/core-features/authentication#token-authentication`);
  });
  it('Preserves ordered lists throughout the parsing process', () => {
    expect(
      postParser(
        textile(
          preParser(`

Ably supports two methods of authentication:

1. "Basic authentication":/core-features/authentication#basic-authentication
2. "Token authentication":/core-features/authentication#token-authentication`),
        ),
      ),
    ).toBe(`<p>Ably supports two methods of authentication:</p>
<ol>
	<li><a href="/core-features/authentication#basic-authentication">Basic authentication</a></li>
	<li><a href="/core-features/authentication#token-authentication">Token authentication</a></li>
</ol>`);
  });
});
