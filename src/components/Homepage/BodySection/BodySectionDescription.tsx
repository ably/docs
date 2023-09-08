import React from 'react';
import Markdown from 'markdown-to-jsx';

export const BodySectionDescription = ({ description }: { description: string }) => (
  <div className="my-24 text-p1 leading-relaxed">
    <Markdown
      options={{
        overrides: {
          a: {
            props: {
              className: 'docs-link',
            },
          },
          p: {
            props: {
              className: 'pb-14',
            },
          },
        },
      }}
    >
      {description}
    </Markdown>
  </div>
);
