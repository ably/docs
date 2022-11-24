import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Ul: FC = (props) => <ul {...props} className="ui-text-p2 pl-16 pb-32 list-disc -mt-16" />;

export default GenericHtmlBlock(Ul);
