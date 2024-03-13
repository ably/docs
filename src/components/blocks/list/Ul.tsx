import React, { FC } from 'react';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Ul: FC<{ className: string }> = (props) => <ul {...props} className="text-p2 pl-16 pb-32 list-disc" />;

export default GenericHtmlBlock(Ul);
