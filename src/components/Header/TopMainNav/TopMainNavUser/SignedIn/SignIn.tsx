import { truncate } from 'lodash/fp';
import React from 'react';
import { SessionState } from '../../../../../contexts/user-context';
import { DropdownButton } from '../../Dropdown/Button';
import { DropdownDataIdentifier } from '../../Dropdown/types';

export const SignedIn = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: SessionState;
  setDropdownData: React.Dispatch<React.SetStateAction<DropdownDataIdentifier>>;
}) => {
  const accountName = truncate({ length: 19 }, sessionState.accountName ?? '');
  return sessionState.account && Object.keys(sessionState.account).length !== 0 ? (
    <menu className="hidden md:flex items-center list-none">
      <li className="ui-meganav-item relative">
        <DropdownButton title={accountName} setDropdownData={() => setDropdownData('Your Account')} />
      </li>
      <li className="ml-16">
        <a href={sessionState.account.links.dashboard.href} className="ui-btn-secondary p-btn-small">
          Dashboard
        </a>
      </li>
    </menu>
  ) : null;
};
