import React from 'react';

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
        <span className="text-right font-medium text-mid-grey">API key:</span>
        <span className="text-right font-light" style={{ color: 'white' }}>
          Demo only
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_112_25267)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00008 1.1665C4.22614 1.1665 1.16675 4.22589 1.16675 7.99984C1.16675 11.7738 4.22614 14.8332 8.00008 14.8332C11.774 14.8332 14.8334 11.7738 14.8334 7.99984C14.8334 4.22589 11.774 1.1665 8.00008 1.1665ZM0.166748 7.99984C0.166748 3.67361 3.67385 0.166504 8.00008 0.166504C12.3263 0.166504 15.8334 3.67361 15.8334 7.99984C15.8334 12.3261 12.3263 15.8332 8.00008 15.8332C3.67385 15.8332 0.166748 12.3261 0.166748 7.99984ZM8.00008 6.66634C8.36827 6.66634 8.66675 6.96482 8.66675 7.33301V11.333C8.66675 11.7012 8.36827 11.9997 8.00008 11.9997C7.63189 11.9997 7.33342 11.7012 7.33342 11.333V7.33301C7.33342 6.96482 7.63189 6.66634 8.00008 6.66634ZM8.00008 5.33301C8.36827 5.33301 8.66675 5.03453 8.66675 4.66634C8.66675 4.29815 8.36827 3.99967 8.00008 3.99967C7.63189 3.99967 7.33342 4.29815 7.33342 4.66634C7.33342 5.03453 7.63189 5.33301 8.00008 5.33301Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_25267">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Chrome;
