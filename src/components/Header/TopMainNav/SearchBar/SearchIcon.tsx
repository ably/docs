import React from 'react';

// Note that transparency will not work the same if imported as an image
export const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 8.5C15 12.0899 12.0899 15 8.5 15C4.91015 15 2 12.0899 2 8.5C2 4.91015 4.91015 2 8.5 2C12.0899 2 15 4.91015 15 8.5ZM13.7618 15.176C12.3145 16.3183 10.4869 17 8.5 17C3.80558 17 0 13.1944 0 8.5C0 3.80558 3.80558 0 8.5 0C13.1944 0 17 3.80558 17 8.5C17 10.4869 16.3183 12.3145 15.176 13.7618L20.7071 19.2929L19.2929 20.7071L13.7618 15.176Z"
      fill="#03020D"
    />
  </svg>
);
