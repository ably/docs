import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Ul: FC<{ className: string }> = (props) => <ul {...props} className="ui-text-p2 pl-16 pb-16 list-disc" />;

export default GenericHtmlBlock(Ul);
