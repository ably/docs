import React from 'react';
import styled from 'styled-components';

const CustomHeightLabel = styled.small`
  height: 1.625rem;
  max-height: 1.625rem;
`;

export const CardFlag = ({ flag }: { flag: string }) => (
  <CustomHeightLabel className="border border-mid-grey rounded-md text-active-orange text-xs font-medium px-8 flex-shrink-0 -mt-8 -mr-8">
    {flag}
  </CustomHeightLabel>
);
