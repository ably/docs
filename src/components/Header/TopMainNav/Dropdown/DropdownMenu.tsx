/* eslint-disable react/prop-types */
import { truncate } from 'lodash/fp';
import React from 'react';
import UserContext, { SessionState } from '../../../../contexts/user-context';
import { ContentsContainer, DropdownContentLink } from './Contents';
import { Summary } from './Summary';
import { DropdownData } from './types';

type Account = {
  links: DropdownContentLink[];
};

const isAccount = (obj: unknown): obj is Account => typeof obj === 'object' && obj !== null && 'links' in obj;

export const DropdownMenu = ({
  summaryTitle,
  summaryDescription,
  summaryLink,
  title,
  contents,
  CustomComponent,
}: DropdownData) => {
  if (CustomComponent) {
    return (
      <UserContext.Consumer>
        {({ sessionState }: { sessionState: SessionState }) => {
          const links = isAccount(sessionState.account) ? Object.values(sessionState.account.links) : [];
          const preferredEmail = truncate({ length: 19 }, sessionState.preferredEmail ?? '');
          return <CustomComponent sessionState={sessionState} links={links} preferredEmail={preferredEmail} />;
        }}
      </UserContext.Consumer>
    );
  }
  return (
    <aside id={summaryTitle}>
      <Summary titleText={summaryTitle} descriptionText={summaryDescription} summaryLink={summaryLink} />
      <ContentsContainer title={title} contents={contents} />
    </aside>
  );
};
