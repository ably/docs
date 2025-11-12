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
  <footer className="flex flex-col my-10">
    <div className="flex flex-col gap-6 px-6 lg:px-0">
      <div className="flex flex-wrap items-center gap-6">
        <span className="ui-text-label3 text-neutral-1300 dark:text-neutral-000">Was this page helpful?</span>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 ui-text-label3 text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors">
            <Icon name="icon-gui-hand-thumb-up-outline" size="20px" />
            Yes
          </button>
          <button className="flex items-center gap-2 ui-text-label3 text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors">
            <Icon name="icon-gui-hand-thumb-down-outline" size="20px" />
            No
          </button>
          <button className="flex items-center gap-2 ui-text-label3 text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors">
            <Icon name="icon-gui-hand-raised-outline" size="20px" /> I have feedback
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <span className="ui-text-p3 text-neutral-800 dark:text-neutral-500">Last updated: Sept 10, 2024</span>
        <a
          href="#"
          className="flex items-center gap-2 ui-text-p3 text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors"
        >
          <Icon name="icon-social-github-mono" size="16px" />
          Edit on GitHub
        </a>
      </div>
    </div>

    <div className="mt-8 border border-x-0 border-y-neutral-300 dark:border-y-neutral-1000 w-full py-6 flex lg:items-center flex-col lg:flex-row gap-6 px-6 lg:px-0">
      <div className="flex gap-6 items-center flex-1">
        <span className="ui-text-p3 text-neutral-900 dark:text-neutral-400">Find us on</span>
        <div className="flex gap-5 items-center">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit Ably on ${link.key}`}
              className="w-5 h-5 group/social-icon"
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

    <div className="flex justify-between w-full flex-col lg:flex-row px-6 lg:px-0 mt-6 gap-6 lg:gap-10">
      {[leftFooterLinks, rightFooterLinks].map((links, index) => (
        <div key={`link-set-${index}`} className="flex gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="ui-text-label4 font-medium text-neutral-900 hover:text-neutral-1300 dark:text-neutral-400 dark:hover:text-neutral-000 transition-colors"
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
