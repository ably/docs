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

const socialLinks: { key: string; colorIcon: IconName; monoIcon: IconName; link: string }[] = [
  { key: 'x', colorIcon: 'icon-social-x', monoIcon: 'icon-social-x-mono', link: 'https://x.com/ablyrealtime' },
  {
    key: 'linkedin',
    colorIcon: 'icon-social-linkedin',
    monoIcon: 'icon-social-linkedin-mono',
    link: 'https://www.linkedin.com/company/ably-realtime',
  },
  {
    key: 'github',
    colorIcon: 'icon-social-github',
    monoIcon: 'icon-social-github-mono',
    link: 'https://github.com/ably/',
  },
  {
    key: 'discord',
    colorIcon: 'icon-social-discord',
    monoIcon: 'icon-social-discord-mono',
    link: 'https://discord.gg/g8yqePUVDn',
  },
  {
    key: 'stackoverflow',
    colorIcon: 'icon-social-stackoverflow',
    monoIcon: 'icon-social-stackoverflow-mono',
    link: 'https://stackoverflow.com/questions/tagged/ably-realtime',
  },
  {
    key: 'youtube',
    colorIcon: 'icon-social-youtube',
    monoIcon: 'icon-social-youtube-mono',
    link: 'https://www.youtube.com/c/AblyRealtime',
  },
];

const Footer: React.FC = () => (
  <footer className="flex flex-col my-40">
    <div className="border border-x-0 border-y-neutral-300 dark:border-y-neutral-1000 w-full py-24 flex lg:items-center flex-col lg:flex-row gap-24 px-24 lg:px-0">
      <div className="flex gap-24 items-center flex-1">
        <a href="/" className="bg-neutral-100 dark:bg-neutral-1200 h-40 w-40 p-8 rounded-full">
          <Icon name="icon-tech-ably" size="24px" />
        </a>
        <div className="flex gap-20 items-center">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit Ably on ${link.key}`}
              className="w-20 h-20 group/social-icon"
            >
              <Icon
                name={link.monoIcon}
                size="20px"
                additionalCSS="text-neutral-1000 dark:text-neutral-300 group-hover/social-icon:hidden"
              />
              <Icon name={link.colorIcon} size="20px" additionalCSS="hidden group-hover/social-icon:flex" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <Status statusUrl={StatusUrl} showDescription />
      </div>
    </div>
    <div className="flex justify-between w-full flex-col lg:flex-row px-24 lg:px-0 mt-24 gap-24">
      {[leftFooterLinks, rightFooterLinks].map((links, index) => (
        <div key={`link-set-${index}`} className="flex gap-20">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="ui-text-menu4 font-medium text-neutral-900 hover:text-neutral-1300 dark:text-neutral-400 dark:hover:text-neutral-000 transition-colors"
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
