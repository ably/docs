import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { matchesLanguageOrDefault } from '../wrappers/language-utilities';
import { PageLanguageContext } from 'src/contexts';
import Html from '../Html';
import { HtmlComponentProps } from 'src/components/html-component-props';
import { isString } from 'lodash/fp';

const DIV_CONTENTS_WHICH_SHOULD_IGNORE_NORMAL_LANGUAGE_RULES = ['dt', 'dd'];

const Div = ({ data, attribs }: HtmlComponentProps<'div'>) => {
  const pageLanguage = useContext(PageLanguageContext);
  const firstChild = data?.[0];
  const childName = isString(firstChild) || !firstChild?.name ? 'text' : firstChild?.name;
  const shouldShowBlock =
    matchesLanguageOrDefault(pageLanguage, attribs?.lang) ||
    DIV_CONTENTS_WHICH_SHOULD_IGNORE_NORMAL_LANGUAGE_RULES.includes(childName);
  return shouldShowBlock ? (
    <div {...attribs}>
      <Html data={data} />
    </div>
  ) : null;
};

export default Div;
