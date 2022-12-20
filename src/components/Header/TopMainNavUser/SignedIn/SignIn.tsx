import { truncate } from 'lodash/fp';
import React from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { DropdownButtonAndMenu } from '../../Dropdown/Button/DropdownButton';
import { TopMainNavStateContext } from '../../top-main-nav-state-context';

export const SignedIn = ({ sessionState }: { sessionState: SessionState }) => {
  const accountName = truncate({ length: 19 }, sessionState.accountName ?? '');

  return sessionState.account && Object.keys(sessionState.account).length !== 0 ? (
    <>
      <TopMainNavStateContext.Consumer>
        {({ topMainNavState, dispatch }) => (
          <DropdownButtonAndMenu
            titleOverride={accountName}
            dropdownDataID={'Your Account'}
            isOpen={topMainNavState['Your Account'].isOpen}
            onActivated={(id) => dispatch({ type: 'activate', dropdownId: id })}
            onMouseOver={(dataId) => dispatch({ type: 'mouse-over', dropdownId: dataId })}
            onMouseOut={(dataId) => dispatch({ type: 'mouse-out', dropdownId: dataId })}
          />
        )}
      </TopMainNavStateContext.Consumer>
      <a href={sessionState.account.links.dashboard.href} className="ui-btn-secondary p-btn-small my-8 min-w-140">
        Dashboard
      </a>
    </>
  ) : null;
};
