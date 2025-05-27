import cn from '@ably/ui/core/utils/cn';
import React from 'react';
import { SmallMenuLabel } from 'src/components/Menu/Label';
import APIKeyIndicator from 'src/components/blocks/software/Code/ApiKeyIndicator';

const NO_API_KEY_TOOLTIP = 'This code example uses a temporary key that is rate limited and expires in 4 hours';

type ComponentProps = {
  title: string;
  children: React.ReactNode;
  theme?: 'light' | 'dark';
};

const Chrome = ({ title, children, theme = 'dark' }: ComponentProps) => {
  return (
    <div className="antialiased">
      <div
        className={cn('flex h-10 px-4 py-1 items-center flex-shrink-0 self-stretch rounded-t-lg border-b', {
          'bg-[#141924] border-[#2B303B]': theme === 'dark',
          'bg-neutral-000 border-neutral-100': theme === 'light',
        })}
      >
        <div className="flex flex-none gap-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="5" fill={theme === 'dark' ? '#39414E' : '#E5E5E5'} />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="5" fill={theme === 'dark' ? '#39414E' : '#E5E5E5'} />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="5" fill={theme === 'dark' ? '#39414E' : '#E5E5E5'} />
          </svg>
        </div>
        <p
          className={cn('flex-grow text-center font-medium', {
            'text-[#ADB6C2]': theme === 'dark',
            'text-neutral-700': theme === 'light',
          })}
        >
          {title}
        </p>
      </div>
      {children}
      <div
        className={cn('flex gap-x-1 h-10 px-4 py-3 items-center rounded-b-lg border-t', {
          'bg-[#202531] border-[#292831]': theme === 'dark',
          'bg-neutral-000 border-neutral-100': theme === 'light',
        })}
      >
        <SmallMenuLabel
          className={cn({ 'text-neutral-000': theme === 'dark', 'text-neutral-1300': theme === 'light' })}
        >
          API Key:
        </SmallMenuLabel>
        <APIKeyIndicator tooltip={NO_API_KEY_TOOLTIP} />
      </div>
    </div>
  );
};

export default Chrome;
