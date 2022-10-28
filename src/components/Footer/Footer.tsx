import React from 'react';
import Logo from '@ably/ui/core/Logo';
import Icon from '@ably/ui/core/Icon';
import FeaturedLink from '@ably/ui/core/FeaturedLink';
import { FooterMenu, FooterMenuItemType } from './FooterMenu';
import { graphql, useStaticQuery } from 'gatsby';

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      menuData: pageFurnitureYaml(name: { eq: "FooterMenu" }) {
        items {
          label
          link
          items {
            label
            link
          }
        }
      }
      ablySocial: pageFurnitureYaml(name: { eq: "AblySocial" }) {
        items {
          label
          link
        }
      }
      bottomMenu: pageFurnitureYaml(name: { eq: "FooterBottomMenu" }) {
        items {
          label
          link
        }
      }
    }
  `);

  const menuDataItems = data.menuData.items;
  const ablySocialLinks = data.ablySocial.items;
  const bottomLinks = data.bottomMenu.items;

  return (
    <>
      <footer className="bg-white antialiased" data-id="footer">
        <div className="max-w-screen-xl mx-auto py-64 ui-grid-gap grid ui-grid-px grid-cols-6">
          <div className="col-span-full md:col-span-2 mb-30 md:mb-0">
            <div>
              <Logo dataId="footer-logo" href="/" />
              <div className="flex flex-row mt-24">
                <iframe className="w-24 h-24 mt-4" src="https://status.ably.com/embed/icon"></iframe>
                <span className="pl-8 font-medium">System status</span>
              </div>
              <FeaturedLink url="https://status.ably.com/" textSize="text-p3">
                <span className="ml-30">More on our status site</span>
              </FeaturedLink>
            </div>
            <div>
              <p className="mt-24 ui-text-p3">Connect with us on:</p>
              <div className="pt-16 flex items-center">
                {ablySocialLinks !== null
                  ? ablySocialLinks.map((social: { label: string; link: string }) => {
                      const hoverStyle = `hover:text-icon-${social.label}`;
                      return (
                        <a className={`h-24 pr-24 text-cool-black ${hoverStyle}`} href={social.link} key={social.label}>
                          <Icon name={social.label} size="1.5rem" />
                        </a>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          {menuDataItems
            ? menuDataItems.map((item: { items: FooterMenuItemType[]; label: string }) => (
                <>
                  <FooterMenu label={item.label} items={item.items} key={item.label} />
                </>
              ))
            : null}
        </div>
        <div className="max-w-screen-xl mx-auto py-40 border-t border-mid-grey w-full">
          <div className="inline-flex  justify-center w-full space-x-24">
            {bottomLinks !== null
              ? bottomLinks.map((link: { label: string; link: string }) => (
                  <a key={link.label} className="ui-footer-link" href={link.link}>
                    {link.label}
                  </a>
                ))
              : null}
          </div>
        </div>
      </footer>
    </>
  );
};
