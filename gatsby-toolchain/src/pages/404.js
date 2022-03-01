import * as React from 'react';
import { StyledH1 } from '../components/blocks/headings/H1';
import { StyledGatsbyLink } from '../components/blocks/external-references/A';

const NotFoundPage = () => {
  return (
    <main>
      <title>Not found</title>
      <StyledH1>404: Page not found</StyledH1>
      <p>
        Sorry - we couldn&apos;t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            Try creating a new page in:
            <ul>
              <li>
                <code>src/pages/</code>: for specific pages
              </li>
              <li>
                <code>data/textile/nanoc-compatible</code>: for complete textile pages
              </li>
              <li>
                <code>data/textile/partials</code>: for reusable textile sections &endash; ask if there&apos;s a
                preferred alternative first.
              </li>
            </ul>
          </>
        ) : null}
        <br />
        <StyledGatsbyLink to="/documentation">Return to documentation home page</StyledGatsbyLink>.
      </p>
    </main>
  );
};

export default NotFoundPage;
