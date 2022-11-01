import React from 'react';
import { FooterMenu, FooterMenuItemType } from './FooterMenu';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterSocial } from './FooterSocial';
import { FooterLogoAndStatus } from './FooterLogoAndStatus';

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
            <FooterLogoAndStatus />
            <p className="mt-24 ui-text-p3">Connect with us on:</p>
            <div className="pt-16 flex items-center">
              {ablySocialLinks
                ? ablySocialLinks.map((social: { label: string; link: string }) => (
                    <FooterSocial label={social.label} link={social.link} key={social.label} />
                  ))
                : null}
            </div>
          </div>
          {menuDataItems
            ? menuDataItems.map((item: { items: FooterMenuItemType[]; label: string }) => (
                <FooterMenu label={item.label} items={item.items} key={item.label} />
              ))
            : null}
        </div>
        <div className="max-w-screen-xl mx-auto py-40 border-t border-mid-grey w-full">
          <div className="inline-flex  justify-center w-full space-x-24">
            {bottomLinks
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
