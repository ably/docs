import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Ol: FC = (props) => <ol {...props} className="ui-text-p2 pl-16 pb-16 list-decimal -mt-16" />;

export default GenericHtmlBlock(Ol);
