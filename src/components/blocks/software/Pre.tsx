import React, { ReactElement, useContext } from 'react';
import cn from 'classnames';
import Icon from '@ably/ui/core/Icon';
import Html from '../Html';
import { PageLanguageContext } from 'src/contexts';
import languageLabels from 'src/maps/language';
import LocalLanguageAlternatives from '../wrappers/LocalLanguageAlternatives';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { HtmlComponentProps, ValidReactElement } from '../../html-component-props';
import HtmlDataTypes from '../../../../data/types/html';
import { isString, every, reduce } from 'lodash/fp';
import { MultilineCodeContent } from './Code/MultilineCodeContent';
import { isArray } from 'lodash';
import { getFilteredLanguages } from 'src/components/common';

type PreProps = HtmlComponentProps<'pre'> & {
  language: string;
  languages?: string[];
  altData?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
};

const Pre = ({ data, languages, altData, attribs }: PreProps): ReactElement => {
  const pageLanguage = useContext(PageLanguageContext);
  const hasCode =
    languages?.some((lang) => getFilteredLanguages(lang) === pageLanguage) || pageLanguage === DEFAULT_LANGUAGE;
  const shouldDisplayTip = !hasCode && languages?.length !== undefined;
  const withModifiedClassname = {
    ...attribs,
    className: `bg-cool-black text-white p-0 rounded-lg relative`,
  };

  const dataTreatedAsCode = data && !isString(data) && every((element) => element.type === HtmlDataTypes.text, data);
  if (dataTreatedAsCode) {
    // We know that the first child's data is a string because we've confirmed the element type in dataTreatedAsCode
    const stringToRender = reduce((acc, curr) => acc.concat((curr.data as string) ?? ''), '', data);

    return (
      <pre {...attribs} className="bg-cool-black text-white p-0 rounded-lg relative overflow-hidden">
        <div className="overflow-auto relative p-16">
          <MultilineCodeContent
            dataContainsKey={false}
            contentWithObfuscatedKey={stringToRender}
            contentWithKey={stringToRender}
            content={stringToRender}
            language={'plaintext'}
          />
        </div>
      </pre>
    );
  }
  // This fixes an issue where paragraphs are added into <pre> elements, which resets the font stylings to black
  // rendering the data unreadable.
  const dataWithoutPTags = isArray(data)
    ? data.map((child) => (child.name === HtmlDataTypes.p ? { ...child, name: HtmlDataTypes.div } : child))
    : data;
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
          <div className="ml-8 leading-normal">
            You’re currently reading the{' '}
            <span className="font-semibold">{languageLabels[pageLanguage] ?? pageLanguage}</span> docs but we don’t yet
            have a relevant code sample. You can explore equivalent samples below. To visit the docs for other
            languages, select the language using the dropdown at the top of the page.
          </div>
        </aside>
      )}
      <pre {...withModifiedClassname}>
        {languages ? (
          <LocalLanguageAlternatives
            languages={languages}
            data={altData}
            initialData={dataWithoutPTags}
            localChangeOnly={shouldDisplayTip}
          />
        ) : (
          <Html data={dataWithoutPTags} />
        )}
      </pre>
    </div>
  );
};

export default Pre;
