import React from 'react';
import styled from 'styled-components';
import { CardProps } from '../../HomepageContent';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';
import FeaturedLink from '@ably/ui/core/FeaturedLink';

const navigateExternal = (link: string) => () => (window.location.href = link);

const EXTERNAL_NAVIGATION_KEY = 'Enter';

const Container = styled.article`
  max-width: 32rem;
`;

export const BodySectionCard = ({ title, content, link, flag, callToAction }: CardProps) => (
  <Container
    tabIndex={0}
    title={link}
    className="cursor-pointer select-none bg-extra-light-grey border border-mid-grey rounded-lg w-full p-24 flex flex-col"
    onClick={navigateExternal(link)}
    onKeyDown={({ key }) => key === EXTERNAL_NAVIGATION_KEY && navigateExternal(link)()}
  >
    <CardHeader title={title} flag={flag} />
    <CardContent content={content} />
    <footer className="mt-auto">
      <FeaturedLink url={link} textSize="text-p2">
        <span className="text-gui-default font-medium">{callToAction}</span>
      </FeaturedLink>
    </footer>
  </Container>
);
