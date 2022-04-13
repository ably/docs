import React, { FunctionComponent as FC } from 'react';
import '@ably/ui/core/styles.css';
import { ChildPropTypes } from '../react-utilities';

const PageTitle: FC = ({ children }) => <h1 className="ui-text-h1 mb-40 col-span-1">{children}</h1>;

PageTitle.propTypes = {
  children: ChildPropTypes,
};

export default PageTitle;
