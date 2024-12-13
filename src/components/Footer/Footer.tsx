import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterStatus } from './FooterStatus';
import Link from '../Link';
import { ablySocialLinks } from './data';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { ABLY_MAIN_WEBSITE } from '../../pages';

type FooterMenuItemType = {
  label: string;
  link: string;
  position?: string;
};

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      bottomMenu: pageFurnitureYaml(name: { eq: "FooterBottomMenu" }) {
        items {
          label
          link
          position
        }
      }
    }
  `);

  const bottomLinks = data.bottomMenu.items ?? [];

  const displayBottomLinks = (position: string) =>
    bottomLinks
      .filter((item: FooterMenuItemType) => item.position === position)
      .map(({ link, label }: FooterMenuItemType) => (
        <Link to={link} key={link} className="ui-footer-link text-neutral-900">
          {label}
        </Link>
      ));

  return (
    <footer
      className="antialiased col-start-1 md:col-start-2 w-full px-24 md:pl-40 md:pr-48 xl:pr-64 my-40 2xl:mx-auto"
      data-id="footer"
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center  py-24 border-t border-b border-t-neutral-300 border-b-neutral-300">
        <div className="flex flex-1 items-center h-40 mb-24 sm:mb-0">
          <Link
            className="rounded-full bg-neutral-100 text-orange-600 hover:text-orange-800 py-6 px-8 flex justify-center mr-24"
            to={ABLY_MAIN_WEBSITE}
          >
            <Icon name="icon-gui-ably-badge" size="1.5rem" />
          </Link>
          {ablySocialLinks.map((social: FooterMenuItemType) => (
            <Link
              className="mr-20 text-neutral-1000 hover:text-neutral-1300 focus:text-neutral-1200 active:text-neutral-1200 flex justify-center"
              to={social.link}
              key={social.link}
            >
              <Icon name={social.label as IconName} size="1.25rem" additionalCSS="h-24" />
            </Link>
          ))}
        </div>
        <FooterStatus />
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center py-24">
        <div className="inline-flex w-full sm:w-1/2 space-x-20"> {displayBottomLinks('left')} </div>
        <div className="inline-flex w-full sm:w-1/2 space-x-20 justify-start sm:justify-end mt-24 sm:mt-0">
          {displayBottomLinks('right')}
        </div>
      </div>
    </footer>
  );
};
