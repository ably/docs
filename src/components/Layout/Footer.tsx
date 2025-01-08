import React from 'react';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import Status, { StatusUrl } from '@ably/ui/core/Status';

const leftFooterLinks = [
  { label: 'Changelog', link: 'https://changelog.ably.com/' },
  { label: 'About Ably', link: '/about' },
  { label: 'Blog', link: '/blog' },
];

const rightFooterLinks = [
  { label: 'Data protection', link: '/data-protection' },
  { label: 'Privacy', link: '/privacy' },
  { label: 'Legals', link: '/legals' },
  { label: 'Cookies', link: '/privacy' },
];

const socialLinks: { label: IconName; link: string }[] = [
  { label: 'icon-social-x', link: 'https://x.com/ablyrealtime' },
  { label: 'icon-social-linkedin', link: 'https://www.linkedin.com/company/ably-realtime' },
  { label: 'icon-social-github', link: 'https://github.com/ably/' },
  { label: 'icon-social-discord', link: 'https://discord.gg/g8yqePUVDn' },
  { label: 'icon-social-stackoverflow', link: 'https://stackoverflow.com/questions/tagged/ably-realtime' },
  { label: 'icon-social-youtube', link: 'https://www.youtube.com/c/AblyRealtime' },
];

const Footer: React.FC = () => (
  <footer className="flex flex-col">
    <div className="border border-x-0 border-y-neutral-300 dark:border-y-neutral-1000 w-full py-24 flex lg:items-center flex-col lg:flex-row gap-24 px-24 lg:px-0">
      <div className="flex gap-24 items-center flex-1">
        <a href="/" className="bg-neutral-100 dark:bg-neutral-1200 h-40 w-40 p-8 rounded-full">
          <Icon name="icon-tech-ably" size="24px" />
        </a>
        <div className="flex gap-20 items-center">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit Ably on ${link.label.replace('icon-social-', '')}`}
              className="w-20 h-20"
            >
              <Icon
                name={link.label}
                size="20px"
                additionalCSS="text-neutral-1000 dark:text-neutral-300 hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
      <div>
        <Status statusUrl={StatusUrl} showDescription />
      </div>
    </div>
    <div className="flex justify-between w-full flex-col lg:flex-row px-24 lg:px-0 my-24 gap-24">
      {[leftFooterLinks, rightFooterLinks].map((links, index) => (
        <div key={`link-set-${index}`} className="flex gap-20">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="ui-text-menu4 text-neutral-900 hover:text-neutral-1300 dark:text-neutral-400 dark:hover:text-neutral-000 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
