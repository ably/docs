import React from 'react';

export const Logo = ({ href = '/' }: { href: string }) => (
  <a href={href} className="h-32">
    <svg width="39" height="30" viewBox="0 0 39 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.2858 0L3.14788 29.5369L0 27.3293L14.932 0H19.2858ZM19.5107 0L35.6487 29.5369L38.7965 27.3293L23.8646 0H19.5107Z"
        fill="url(#paint0_linear_583_2361)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_583_2361"
          x1="5.47361"
          y1="37.4219"
          x2="32.4603"
          y2="7.45023"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5416" />
          <stop offset="0.2535" stopColor="#FF5115" />
          <stop offset="0.461" stopColor="#FF4712" />
          <stop offset="0.6523" stopColor="#FF350E" />
          <stop offset="0.8327" stopColor="#FF1E08" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
      </defs>
    </svg>
  </a>
);
