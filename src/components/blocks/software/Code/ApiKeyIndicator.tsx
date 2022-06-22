import React from 'react';

const tooltip =
  'This code example uses a temporary key that is rate limited and expires in 4 hours. Sign in to Ably to use your API keys instead.';

const APIKeyIndicator = () => (
  <div className="docs-api-key-label" title={tooltip}>
    Api Key: Demo Only
  </div>
);

export default APIKeyIndicator;
