import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterTopNav } from './FooterTopNav';
import { FooterBottomNav } from './FooterBottomNav';

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      menuData: pageFurnitureYaml(name: { eq: "FooterMenu" }) {
        items {
          label
          link
          external
          items {
            label
            link
            external
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
          external
        }
      }
    }
  `);

  const menuDataItems = data.menuData.items ?? [];
  const ablySocialLinks = data.ablySocial.items ?? [];
  const bottomLinks = data.bottomMenu.items ?? [];

  return (
    <>
      <footer className="bg-white border-t border-mid-grey antialiased col-start-1 md:col-start-2" data-id="footer">
        <FooterTopNav ablySocialLinks={ablySocialLinks} menuDataItems={menuDataItems} />
        <FooterBottomNav bottomLinks={bottomLinks} />
      </footer>
    </>
  );
};
