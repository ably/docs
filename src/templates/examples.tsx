import React, { useContext } from 'react';
import Markdown from 'markdown-to-jsx';
import { ExampleWithContent } from 'src/data/examples/types';
import UserContext from 'src/contexts/user-context';
import { getApiKey } from 'src/utilities/update-ably-connection-keys';
import Icon from '@ably/ui/core/Icon';
import ExamplesRenderer from 'src/components/Examples/ExamplesRenderer';

const Examples = ({ pageContext }: { pageContext: { example: ExampleWithContent } }) => {
  const { example } = pageContext;
  const userData = useContext(UserContext);
  const apiKey = getApiKey(userData);

  return (
    <>
      <div className="flex gap-16 mt-40 mb-20">
        <Icon name="icon-gui-chevron-left-micro" />
        All examples
      </div>
      <div className="flex gap-16">
        <h1 className="ui-text-title">{example.name}</h1>
        <p className="ui-text-sub-header">{example.description}</p>
      </div>
      <hr />
      {apiKey ? <ExamplesRenderer example={example} apiKey={apiKey} /> : <p>Loading...</p>}
      <hr />
      {example.content ? <Markdown>{example.content}</Markdown> : null}
    </>
  );
};

export default Examples;
