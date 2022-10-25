import React from 'react';
import { render, screen } from '@testing-library/react';
import { DlWrapper } from 'src/components/blocks/list/Dl/DlWrapper';
import { PageLanguageContext } from 'src/contexts';

import Html from './';
import { dtFixture } from './fixtures';

describe('<Html />', () => {
  it('renders correct Dl based on PageLanguageContext value', () => {
    const { container } = render(
      <PageLanguageContext.Provider value="python">
        <Html data={dtFixture} BlockWrapper={DlWrapper} />
      </PageLanguageContext.Provider>,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        
      	
        <dt
          class="sc-hKMtZM hqbRVj"
        >
          name
        </dt>
        
      	
        <dd
          class="sc-gsnTZi dJqSEs"
        >
          event name for the published message
          <span
            lang="python"
          >
            <em>
              Type: 
              <code
                class="font-mono font-semibold text-code p-4"
              >
                Unicode
              </code>
               for Python 2, 
              <code
                class="font-mono font-semibold text-code p-4"
              >
                String
              </code>
               for Python 3
            </em>
          </span>
        </dd>
        
      	
        <div
          lang="python"
        >
          <dt
            class="sc-hKMtZM hqbRVj"
          >
            <div>
              data
            </div>
          </dt>
          <dd
            class="sc-gsnTZi dJqSEs"
          >
            data payload for the message. The supported payload types are unicode Strings, Dict, or List objects that can be serialized to 
            <span
              class="caps"
            >
              JSON
            </span>
             using 
            <code
              class="font-mono font-semibold text-code p-4"
            >
              json.dumps
            </code>
            , binary data as 
            <code
              class="font-mono font-semibold text-code p-4"
            >
              bytearray
            </code>
             (in Python 3, 
            <code
              class="font-mono font-semibold text-code p-4"
            >
              bytes
            </code>
             also works), and None.
            <em>
              Type: 
              <code
                class="font-mono font-semibold text-code p-4"
              >
                Object
              </code>
            </em>
          </dd>
        </div>
        
      	
        
      	
        
      	
        
      	
        
      	
        

      </div>
    `);
  });
});
