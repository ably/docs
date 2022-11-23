import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Ol: FC = (props) => <ol {...props} className="ui-text-p1 pl-16 pb-32 list-decimal -mt-16" />;

export default GenericHtmlBlock(Ol);
