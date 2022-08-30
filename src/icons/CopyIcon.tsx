import React, { SVGProps } from 'react';

const CopyIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2.666.836c-1.012 0-1.833.82-1.833 1.833v6.667c0 1.012.82 1.833 1.833 1.833h.667a.5.5 0 0 0 0-1h-.667a.833.833 0 0 1-.833-.833V2.669c0-.46.373-.833.833-.833h6.667c.46 0 .833.373.833.833v.667a.5.5 0 0 0 1 0v-.667c0-1.012-.82-1.833-1.833-1.833H2.666Zm4 4c-1.012 0-1.833.82-1.833 1.833v6.667c0 1.012.82 1.833 1.833 1.833h6.667c1.012 0 1.833-.82 1.833-1.833V6.669c0-1.012-.82-1.833-1.833-1.833H6.666Zm-.833 1.833c0-.46.373-.833.833-.833h6.667c.46 0 .833.373.833.833v6.667c0 .46-.373.833-.833.833H6.666a.833.833 0 0 1-.833-.833V6.669Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CopyIcon;
