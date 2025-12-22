import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import Status, { StatusUrl } from '@ably/ui/core/Status';
import cn from '@ably/ui/core/utils/cn';
import type { PageContextType } from './Layout';
import { useLayoutContext } from 'src/contexts/layout-context';
import Button from '@ably/ui/core/Button';

const ENABLE_FEEDBACK = false;

type FeedbackMode = 'yes' | 'no' | 'feedback';

type FeedbackButton = {
  label: string;
  monoIcon: IconName;
  colorIcon: IconName;
  placeholder: string;
  description?: string;
};

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

const socialLinks: { key: string; icon: IconName; link: string }[] = [
  { key: 'x', icon: 'icon-social-x-mono', link: 'https://x.com/ablyrealtime' },
  {
    key: 'linkedin',
    icon: 'icon-social-linkedin-mono',
    link: 'https://www.linkedin.com/company/ably-realtime',
  },
  {
    key: 'github',
    icon: 'icon-social-github-mono',
    link: 'https://github.com/ably/',
  },
  {
    key: 'discord',
    icon: 'icon-social-discord-mono',
    link: 'https://discord.gg/g8yqePUVDn',
  },
  {
    key: 'stackoverflow',
    icon: 'icon-social-stackoverflow-mono',
    link: 'https://stackoverflow.com/questions/tagged/ably-realtime',
  },
  {
    key: 'youtube',
    icon: 'icon-social-youtube-mono',
    link: 'https://www.youtube.com/c/AblyRealtime',
  },
];

const feedbackButtons: Record<FeedbackMode, FeedbackButton> = {
  yes: {
    label: 'Yes',
    monoIcon: 'icon-gui-hand-thumb-up-outline',
    colorIcon: 'icon-gui-hand-thumb-up-solid',
    description: 'Great! Thanks for letting us know, what are we doing well?',
    placeholder: 'Optional feedback.',
  },
  no: {
    label: 'No',
    monoIcon: 'icon-gui-hand-thumb-down-outline',
    colorIcon: 'icon-gui-hand-thumb-down-solid',
    description: 'Yikes! Thanks for letting us know, what can we do better?',
    placeholder: 'Optional feedback.',
  },
  feedback: {
    label: 'I have feedback',
    monoIcon: 'icon-gui-hand-raised-outline',
    colorIcon: 'icon-gui-hand-raised-solid',
    placeholder: 'What would you like to say?',
  },
};

const Footer: React.FC<{ pageContext: PageContextType }> = ({ pageContext }) => {
  const { activePage } = useLayoutContext();
  const { frontmatter } = pageContext;
  const location = useLocation();
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // TODO: Implement and enable feedback survey submission after strategy determined
  /*
  useEffect(() => {
    if (typeof window === 'undefined' || !posthog?.getSurveys) {
      return;
    }

    posthog.getSurveys((surveys: Survey[]) => {
      const relevantSurvey = surveys.find((s) => s.name === externalScriptsData.posthogFeedbackSurveyName);

      if (relevantSurvey) {
        setSurvey(relevantSurvey);
      }
    }, true);
  }, [posthog, externalScriptsData.posthogFeedbackSurveyName]);
  */

  useEffect(() => {
    if (!feedbackMode) {
      setSubmitted(false);
      setFeedbackText('');
    }
  }, [feedbackMode]);

  // TODO: Implement and enable feedback survey submission after strategy determined
  /*
  const handleFeedbackSubmit = () => {
    if (!survey || !survey.id || !survey.questions[0]?.id) {
      return;
    }

    const responseKey = `$survey_response_${survey.questions[0].id}`;

    posthog.capture('docs-feedback-survey', {
      $survey_id: survey.id,
      [responseKey]: feedbackText,
      type: feedbackMode,
      page: activePage.page.link,
      language: activePage.language,
    });

    setFeedbackText('');
    setSubmitted(true);
    setTimeout(() => {
      setFeedbackMode(null);
    }, 2000);
  };
  */

  const lastUpdated = useMemo(() => {
    if (frontmatter?.last_updated) {
      try {
        return new Date(frontmatter.last_updated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [frontmatter]);

  const githubEditPath = useMemo(() => {
    let path = '#';
    const pathName = location.pathname.replace('docs/', '');

    if (activePage.template === 'mdx') {
      path =
        'https://github.com/ably/docs/blob/main/src/pages/docs' +
        (activePage.page.index ? `${pathName}/index.mdx` : `${pathName}.mdx`);
    } else {
      return null;
    }

    return path;
  }, [location.pathname, activePage.template, activePage.page.index]);

  return (
    <footer className="flex flex-col my-10">
      <div className="flex flex-col gap-6 px-6 lg:px-0">
        {ENABLE_FEEDBACK && (
          <div className="flex flex-wrap items-center gap-6">
            <span className="ui-text-label3 font-semibold text-neutral-1300 dark:text-neutral-000">
              Was this page helpful?
            </span>
            <div className="flex items-center gap-6">
              {Object.entries(feedbackButtons).map(([key, button]) => {
                const isActive = feedbackMode === key;

                return (
                  <button
                    key={key}
                    className="group/feedback-button flex items-center gap-2 ui-text-label3 text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors focus-base"
                    onClick={() => {
                      setFeedbackMode(key as FeedbackMode);
                    }}
                  >
                    <Icon
                      name={button.colorIcon}
                      size="20px"
                      additionalCSS="transition-colors"
                      color={
                        isActive
                          ? 'text-orange-600'
                          : 'hidden group-hover/feedback-button:block text-neutral-1300 dark:text-neutral-000'
                      }
                    />
                    {!isActive && (
                      <Icon
                        name={button.monoIcon}
                        size="20px"
                        additionalCSS="transition-colors"
                        color="text-neutral-900 dark:text-neutral-400 group-hover/feedback-button:hidden"
                      />
                    )}
                    <span
                      className={cn('transition-colors', {
                        'text-neutral-1300 dark:text-neutral-000': isActive,
                        'group-hover/feedback-button:text-neutral-1300 dark:group-hover/feedback-button:text-neutral-000':
                          !isActive,
                      })}
                    >
                      {button.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {feedbackMode &&
          (() => {
            const activeFeedbackButton = feedbackButtons[feedbackMode];

            if (submitted) {
              return (
                <div className="flex items-center gap-2 py-2">
                  <span className="ui-text-p3 font-medium text-green-600 dark:text-green-500">
                    Feedback submitted. Thank you!
                  </span>
                </div>
              );
            }

            return (
              <div className="flex flex-col items-start gap-6">
                {activeFeedbackButton?.description && (
                  <span className="ui-text-p3 font-medium text-neutral-1000 dark:text-neutral-300">
                    {activeFeedbackButton.description}
                  </span>
                )}
                <textarea
                  rows={3}
                  className="w-full py-2 px-3 ui-text-p3 rounded-lg border border-neutral-400 dark:border-neutral-900 focus-base"
                  placeholder={activeFeedbackButton?.placeholder}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  {feedbackMode === 'feedback' && (
                    <Button variant="secondary" size="xs" onClick={() => setFeedbackMode(null)}>
                      Cancel
                    </Button>
                  )}
                  <Button variant="primary" size="xs" disabled={!feedbackText}>
                    Send feedback
                  </Button>
                </div>
              </div>
            );
          })()}

        <div className="flex flex-wrap items-center gap-5">
          {lastUpdated && (
            <span className="ui-text-p4 text-neutral-800 dark:text-neutral-500 border-r border-neutral-300 dark:border-neutral-1000 pr-5">
              Last updated: {lastUpdated}
            </span>
          )}
          {githubEditPath && (
            <a href={githubEditPath} className="flex items-center gap-2 ui-text-p4 ui-link transition-colors">
              <Icon name="icon-social-github-mono" size="16px" color="text-neutral-900 dark:text-neutral-400" />
              Edit on GitHub
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 border border-x-0 border-y-neutral-300 dark:border-y-neutral-1000 w-full py-6 flex lg:items-center flex-col lg:flex-row gap-6 px-6 lg:px-0">
        <div className="flex gap-5 items-center flex-1">
          <span className="ui-text-p3 font-semibold text-neutral-1300 dark:text-neutral-000">Find us on</span>
          <div className="flex gap-1 items-center">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit Ably on ${link.key}`}
                className="size-8 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-1200 active:bg-neutral-200 dark:active:bg-neutral-1100 rounded p-1.5 focus-base"
              >
                <Icon name={link.icon} size="20px" additionalCSS="text-neutral-900 dark:text-neutral-400" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full px-6 lg:px-0 mt-6 gap-6 sm:flex-row flex-col justify-between items-start">
        <div className="flex gap-6">
          {[leftFooterLinks, rightFooterLinks].map((links, index) => (
            <div key={`link-set-${index}`} className="flex flex-col gap-1 min-w-40">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.link}
                  className="ui-text-label3 font-medium text-neutral-900 hover:text-neutral-1300 active:text-neutral-1100 dark:text-neutral-400 dark:hover:text-neutral-000 dark:active:text-neutral-200 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <Status
          additionalCSS="px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-1000 hover:border-neutral-500 dark:hover:border-neutral-800 transition-colors"
          statusUrl={StatusUrl}
          showDescription
        />
      </div>
    </footer>
  );
};

export default Footer;
