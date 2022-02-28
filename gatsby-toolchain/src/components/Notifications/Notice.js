import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import AIBarricade from '../../styles/svg/notification-levels/ai-barricade';
import styled from 'styled-components';

const MESSAGE_LEVEL = Object.freeze({
  TIP: 'Tip:',
  NOTICE: 'Notice:',
  CAUTION: 'Caution:',
  WARNING: 'Warning:',
  ERROR: 'Sorry:',
});

const MESSAGE_ICONS = Object.freeze({
  [MESSAGE_LEVEL.WARNING]: <AIBarricade role="presentation" />,
});

const CAlertMessage = styled.div`
  display: flex;
  font-size: inherit;
  margin: 0;

  a {
    color: white;
    font-weight: 700;
    text-decoration: underline;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      color: inherit;
      opacity: 1;
    }
  }

  ul {
    margin-left: 20px;
    text-align: left;
    list-style-type: disc;

    li {
      margin-bottom: 5px;
    }
  }

  position: relative;
  display: flex;
  width: 100%;
  align-content: center;
`;

const SuggestDestination = ({ message, messageLevel, href, linkText }) => (
  <>
    {MESSAGE_ICONS[messageLevel]}
    <CAlertMessage className="px-8">
      <span>
        <strong>{messageLevel}</strong>
        {message}
        <strong>
          <Link to={href}>{linkText}</Link>
        </strong>
        .
      </span>
    </CAlertMessage>
  </>
);

SuggestDestination.propTypes = {
  message: PropTypes.string,
  messageLevel: PropTypes.string,
  href: PropTypes.string,
  linkText: PropTypes.string,
};

export { MESSAGE_LEVEL };
export default SuggestDestination;
