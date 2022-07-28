import React from 'react';
import { DropdownButton } from '../../Dropdown/Button';
import { DropdownDataIdentifier } from '../../Dropdown/types';

type Account = {
  links: { href: string; text: string }[];
};

const isAccount = (obj: unknown): obj is Account => typeof obj === 'object' && obj !== null && 'links' in obj;

const truncate = (string: unknown, length: number) => {
  return typeof string === 'string' && string.length
    ? string.length > length
      ? `${string.slice(0, length)}…`
      : string
    : '';
};

export const SignedIn = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: Record<string, unknown>;
  setDropdownData: React.Dispatch<React.SetStateAction<DropdownDataIdentifier>>;
}) => {
  const links = isAccount(sessionState.account) ? Object.values(sessionState.account.links) : [];
  const accountName = truncate(sessionState.accountName, 19);
  const preferredEmail = truncate(sessionState.preferredEmail, 19);
  return (
    <menu className="hidden md:flex items-center">
      <li className="ui-meganav-item relative">
        <DropdownButton title={accountName} setDropdownData={() => setDropdownData('Your Account')} />
      </li>
      {sessionState.account && (
        <li className="ml-16">
          <a href={sessionState.account.links.dashboard.href} className="ui-btn-secondary p-btn-small">
            Dashboard
          </a>
        </li>
      )}
    </menu>
  );
};
