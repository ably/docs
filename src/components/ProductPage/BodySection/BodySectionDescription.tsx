import React from 'react';
import Markdown from 'markdown-to-jsx';

export const BodySectionDescription = ({ description }: { description: string }) => (
  <div className="my-24 ui-text-p2 leading-relaxed">
    <Markdown
      options={{
        overrides: {
          a: {
            props: {
              className: 'ui-link',
            },
          },
          p: {
            props: {
              className: 'ui-text-p2 text-neutral-1000 pb-16',
            },
          },
        },
      }}
    >
      {description}
    </Markdown>
  </div>
);
