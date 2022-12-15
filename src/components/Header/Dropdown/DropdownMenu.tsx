/* eslint-disable react/prop-types */
import { truncate } from 'lodash/fp';
import React from 'react';
import UserContext, { SessionState } from '../../../contexts/user-context';
import { ContentsContainer, DropdownContentLink } from './Contents';
import { Summary } from './Summary';
import { DropdownData } from './types';
import { kebabCase } from 'lodash';
import { Container } from 'src/components/Container';

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
    <Container
      as="aside"
      className="top-64 fixed w-full left-0 right-0 bg-white shadow-container"
      id={kebabCase(summaryTitle)}
    >
      <div className="grid grid-cols-3 max-w-1312 mx-auto">
        <Summary titleText={summaryTitle} descriptionText={summaryDescription} summaryLink={summaryLink} />
        <ContentsContainer title={title} contents={contents} />
      </div>
    </Container>
  );
};
