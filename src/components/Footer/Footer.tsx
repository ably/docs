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
};

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      bottomMenu: pageFurnitureYaml(name: { eq: "FooterBottomMenu" }) {
        items {
          label
          link
          external
        }
      }
    }
  `);

  const bottomLinks = data.bottomMenu.items ?? [];

  return (
    <footer className="px-20 antialiased col-start-1 md:col-start-2" data-id="footer">
      <div className="w-full flex flex-1 justify-between">
        <div className="pt-16 flex">
          {ablySocialLinks.map((social: FooterMenuItemType) => (
            <Link className="h-24 pr-24 text-cool-black hover:text-active-orange" to={social.link} key={social.label}>
              <Icon name={social.label as IconName} size="1.5rem" />
            </Link>
          ))}
        </div>
        <FooterStatus />
      </div>
      <div className="max-w-screen-xl mx-auto py-40  w-full">
        <div className="inline-flex  justify-center w-full space-x-24">
          {bottomLinks.map(({ link, label, external }: FooterMenuItemType) => (
            <Link to={link} key={label} external={external} className="ui-footer-link">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
