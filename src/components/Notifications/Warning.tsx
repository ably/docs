import React, { useState, FunctionComponent as FC } from 'react';
import SuggestDestination, { MESSAGE_LEVEL } from './Notice';
import AICloseRounded from '../../styles/svg/ai-close-rounded';
import { primary } from '../../styles/colors';
import styled from 'styled-components';
import NullComponent from '../NullComponent';

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

const Warning: FC<{ message: string; href: string; linkText: string }> = ({ message, href, linkText }) => {
  const [isVisible, setVisible] = useState(false);
  return isVisible ? (
    <NullComponent />
  ) : (
    <CAlertWarning className="p-8 col-span-3 mb-40">
      <SuggestDestination message={message} messageLevel={MESSAGE_LEVEL.WARNING} href={href} linkText={linkText} />
      <button type="button" className="text-white" onClick={() => setVisible(false)} aria-label="Close">
        <AICloseRounded role="role" />
      </button>
    </CAlertWarning>
  );
};

export default Warning;
