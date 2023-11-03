import React from 'react';
import { SmallMenuLabel } from 'src/components/Menu/Label';
import APIKeyIndicator from 'src/components/blocks/software/Code/ApiKeyIndicator';

const NO_API_KEY_TOOLTIP = 'This code example uses a temporary key that is rate limited and expires in 4 hours';

type ComponentProps = { title: string; children: React.ReactNode };

const Chrome = ({ title, children }: ComponentProps) => {
  return (
    <div style={{ fontSize: '0.875rem' }}>
      <div
        className="flex h-40 px-16 py-4 items-center flex-shrink-0 self-stretch rounded-t-lg border-b"
        style={{ backgroundColor: '#141924', borderColor: '#2B303B' }}
      >
        <div className="flex flex-none gap-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="5" fill="#39414E" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="5" fill="#39414E" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="5" fill="#39414E" />
          </svg>
        </div>
        <p className="flex-grow text-center font-medium" style={{ color: '#ADB6C2' }}>
          {title}
        </p>
      </div>
      {children}
      <div
        className="flex gap-x-4 h-40 px-16 py-12 items-center rounded-b-md border-t"
        style={{ backgroundColor: '#202531', borderColor: '#292831' }}
      >
        <SmallMenuLabel>API Key:</SmallMenuLabel>
        <APIKeyIndicator tooltip={NO_API_KEY_TOOLTIP} />
      </div>
    </div>
  );
};

export default Chrome;
