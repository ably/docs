import React from 'react';
import { expectAccessibility } from 'src/utilities/test/expect-accessibility';
import PageTitle from './PageTitle';

describe('Basic accessibility test', () => {
  it('is accessible', () => {
    expectAccessibility(<PageTitle>Lorem Ipsum</PageTitle>);
  });
});
