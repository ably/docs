import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChildPropTypes } from '../../../react-utilities';
import styled from 'styled-components';
import AILink from '../../../styles/svg/ai-link';
import { secondary, tertiary } from '../../../styles/colors';

const StyledLinkCopyButton = styled.button`
  height: 100%;
  :hover {
    color: ${secondary.actionBlue};
  }
`;

const LinkHoverPopup = styled.div`
  display: inline-block;
  position: absolute;
  background-color: ${({ copySuccess }) =>
    copySuccess ? tertiary.backgroundGreen : copySuccess === null ? '#fff' : tertiary.warningRed};
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: ${secondary.cableGrey};
  font-weight: 400;
  padding: 25px 20px;
  line-height: 100%;
  white-space: nowrap;
  word-break: initial;
  z-index: 5;
  top: 48px;
  transition: background-color 1000ms linear;

  &:after {
    content: '';
    position: absolute;
    left: 10px;
    width: 0;
    height: 0;
    bottom: 64px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid
      ${({ copySuccess }) =>
        copySuccess ? tertiary.backgroundGreen : copySuccess === null ? '#fff' : tertiary.warningRed};
    z-index: inherit;
    transition: border-bottom 1000ms linear;
  }
`;

const LinkCopyButton = ({ id, ...props }) => {
  const [hover, setHover] = useState(true);
  const [content, setContent] = useState('Copy section link to clipboard');
  const [copySuccess, setCopySuccess] = useState(null);

  const resetState = () => {
    setContent('Copy section link to clipboard');
    setCopySuccess(null);
  };

  useEffect(() => {
    const resetStateTimeout = setTimeout(resetState, 2000);
    return () => clearTimeout(resetStateTimeout);
  }, [copySuccess]);
  return (
    <div className="relative">
      {hover && (
        <LinkHoverPopup id={'link-copy-tooltip'} role="tooltip" copySuccess={copySuccess}>
          {content}
        </LinkHoverPopup>
      )}
      <StyledLinkCopyButton
        {...props}
        aria-describedby={'link-hover-tooltip'}
        id={id}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          const linkToCopy = `${window.location.href}#${id}`;
          navigator.clipboard.writeText(linkToCopy).then(
            () => {
              setContent('Section link copied ✓');
              setCopySuccess(true);
              setTimeout(resetState, 2000);
            },
            (err) => {
              setContent(`Failed to copy section link ×\n\n${err}`);
              setCopySuccess(false);
              setTimeout(resetState, 2000);
            },
          );
        }}
      >
        <AILink />
      </StyledLinkCopyButton>
    </div>
  );
};

LinkCopyButton.propTypes = {
  id: PropTypes.string,
};

const CopyLink = ({ attribs, children }) => {
  const [hover, setHover] = useState(false);
  if (!attribs || !attribs.id) {
    return <>{children}</>;
  }
  return (
    <div className="flex items-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {hover && <LinkCopyButton title="Copy section link" id={attribs.id} />}
      {children}
    </div>
  );
};

CopyLink.propTypes = {
  attribs: PropTypes.object,
  children: ChildPropTypes,
};

export { LinkHoverPopup };
export default CopyLink;
