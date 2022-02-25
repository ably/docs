import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SuggestDestination, { MESSAGE_LEVEL } from './Notice';
import AICloseRounded from '../../styles/svg/ai-close-rounded';
import { primary } from '../../styles/colors';
import styled from 'styled-components';

const CAlertWarning = styled.div`
  background-color: ${primary.brightOrange};
  color: white;
  position: relative;
  min-height: 60px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
  opacity: 1;
`;

const Warning = ({ message, href, linkText }) => {
  const [hidden, setHidden] = useState(false);
  return (
    hidden || (
      <CAlertWarning className="px-4">
        <SuggestDestination message={message} messageLevel={MESSAGE_LEVEL.WARNING} href={href} linkText={linkText} />
        <button type="button" className="text-white" onClick={() => setHidden(true)} aria-label="Close">
          <AICloseRounded role="presentation" />
        </button>
      </CAlertWarning>
    )
  );
};

Warning.propTypes = {
  message: PropTypes.string,
  href: PropTypes.string,
  linkText: PropTypes.string,
};

export default Warning;
