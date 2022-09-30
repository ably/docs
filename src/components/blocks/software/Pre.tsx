import React, { ReactElement, useContext } from 'react';
import cn from 'classnames';
import Icon from '@ably/ui/core/Icon';
import Html from '../Html';
import { PageLanguageContext } from 'src/contexts';
import languageLabels from 'src/maps/language';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { HtmlComponentProps, ValidReactElement } from '../../html-component-props';

type PreProps = HtmlComponentProps<'pre'> & {
  language: string;
  languages?: string[];
  altData?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
};

const Pre = ({ data, languages, altData, attribs }: PreProps): ReactElement => {
  const pageLanguage = useContext(PageLanguageContext);
  const hasCode = languages?.some((lang) => lang === pageLanguage) || pageLanguage === DEFAULT_LANGUAGE;
  const shouldDisplayTip = !hasCode && languages?.length !== undefined;

  const withModifiedClassname = {
    ...attribs,
    className: `bg-cool-black text-white p-0 rounded-lg relative`,
  };
  return (
    <div
      className={cn('my-32', {
        'p-16 bg-light-grey rounded-lg': shouldDisplayTip,
      })}
    >
      {shouldDisplayTip && (
        <aside className="mb-16 flex justify-between items-start">
          <div className="mt-2">
            <Icon name="icon-gui-info" size="1rem" />
          </div>
          <div className="ml-8">
            You’re currently reading the{' '}
            <span className="font-semibold">{languageLabels[pageLanguage] ?? pageLanguage}</span> docs but we don’t yet
            have a relevant code sample. You can explore equivalent samples below. To visit the docs for other
            languages, select the language using the dropdown at the top of the page.
          </div>
        </aside>
      )}
      <pre {...withModifiedClassname}>
        {languages ? (
          <LocalLanguageAlternatives languages={languages} data={altData}>
            <Html data={data} />
          </LocalLanguageAlternatives>
        ) : (
          <Html data={data} />
        )}
      </pre>
    </div>
  );
};

export default Pre;
