import * as React from 'react';
import { Link } from 'gatsby';
import { DOCUMENTATION_NAME } from '../../../data/transform/constants';

const NotFoundPage = () => {
  return (
    <main>
      <title>Not found</title>
      <h1>404: Page not found</h1>
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
        <Link to={`/${DOCUMENTATION_NAME}`}>Return to documentation home page</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;
