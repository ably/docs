import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Ol: FC = (props) => <ol {...props} className="ui-text-p2 pl-4 pb-4 list-decimal -mt-4" />;

export default GenericHtmlBlock(Ol);
