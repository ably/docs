import React from 'react';
import { expectAccessibility } from 'src/utilities/test/expect-accessibility';
import { RightSidebar } from './RightSidebar';

describe('Basic accessibility test for RightSidebar', () => {
  it('is accessible', () => {
    expectAccessibility(
      <RightSidebar
        menuData={[
          {
            name: 'test',
            id: 'sidebar-heading-test',
          },
        ]}
        languages={true}
      />,
    );
  });
});
