import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterStatus } from './FooterStatus';
import Link from '../Link';
import { ablySocialLinks } from './data';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';

type FooterMenuItemType = {
  label: string;
  link: string;
  external?: boolean;
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
      .map(({ link, label, external }: FooterMenuItemType) => (
        <Link to={link} key={label} external={external} className="ui-footer-link text-neutral-900">
          {label}
        </Link>
      ));

  return (
    <footer
      className="antialiased col-start-1 md:col-start-2 w-full max-w-1264 px-24 md:pl-40 md:pr-48 xl:pr-64 my-40"
      data-id="footer"
    >
      <div className="w-full flex flex-1 justify-between items-center  py-24 border-t border-b border-t-neutral-300 border-b-neutral-300">
        <div className="flex flex-1 items-center h-40">
          <Link
            className="rounded-full bg-neutral-100 text-active-orange hover:text-cool-black py-6 px-8 flex justify-center mr-24"
            to="https://www.ably.com/"
          >
            <Icon name="icon-gui-ably-badge" size="1.5rem" />
          </Link>
          {ablySocialLinks.map((social: FooterMenuItemType) => (
            <Link
              className="mr-20 text-neutral-1000 hover:text-active-orange flex justify-center"
              to={social.link}
              key={social.label}
            >
              <Icon name={social.label as IconName} size="1.25rem" additionalCSS="h-24" />
            </Link>
          ))}
        </div>
        <FooterStatus />
      </div>
      <div className="w-full flex flex-row justify-between items-center py-24">
        <div className="flex flex-1 w-1/2 space-x-24"> {displayBottomLinks('left')} </div>
        <div className="flex flex-1 justify-end w-1/2 space-x-24">{displayBottomLinks('right')}</div>
      </div>
    </footer>
  );
};
