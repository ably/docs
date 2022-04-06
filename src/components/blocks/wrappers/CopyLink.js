import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChildPropTypes } from '../../../react-utilities';
import styled from 'styled-components';
import AILink from '../../../styles/svg/ai-link';
import { secondary, tertiary } from '../../../styles/colors';

const StyledLinkCopyButton = styled.button`
  height: 100%;
  :hover {
    color: ${secondary.black};
  }
  :focus {
    outline: none;
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
    left: 4px;
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

const LinkCopyButton = ({ id, parentHovered, ...props }) => {
  const [hover, setHover] = useState(false);
  const [content, setContent] = useState('Copy section link to clipboard');
  const [copySuccess, setCopySuccess] = useState(null);

  const resetState = () => {
    setContent('Copy section link to clipboard');
    setCopySuccess(null);
  };

  const copyLink = () => {
    const linkToCopy = `${window.location.href.replace(/#.*$/, '')}#${id}`;
    navigator.clipboard.writeText(linkToCopy).then(
      () => {
        setContent('Section link copied ✓');
        setCopySuccess(true);
      },
      (err) => {
        setContent(`Failed to copy section link ×\n\n${err}`);
        setCopySuccess(false);
      },
    );
  };

  useEffect(() => {
    const resetStateTimeout = setTimeout(resetState, 2000);
    return () => clearTimeout(resetStateTimeout);
  }, [copySuccess]);
  return (
    <div className="relative -mt-16" onKeyPress={(event) => event.key === 'Enter' && copyLink()}>
      {(hover || parentHovered) && (
        <LinkHoverPopup id={'link-copy-tooltip'} role="tooltip" copySuccess={copySuccess}>
          {content}
        </LinkHoverPopup>
      )}
      <StyledLinkCopyButton
        {...props}
        aria-describedby={'link-hover-tooltip'}
        id={id}
        tabIndex="0"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={copyLink}
      >
        <AILink />
      </StyledLinkCopyButton>
    </div>
  );
};

LinkCopyButton.propTypes = {
  id: PropTypes.string,
  parentHovered: PropTypes.bool,
};

const CopyLink = ({ attribs, children }) => {
  const [hover, setHover] = useState(false);
  if (!attribs || !attribs.id) {
    return <>{children}</>;
  }
  return (
    <div className={`flex items-center`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      <LinkCopyButton id={attribs.id} parentHovered={hover} />
    </div>
  );
};

CopyLink.propTypes = {
  attribs: PropTypes.object,
  children: ChildPropTypes,
};

export { LinkHoverPopup };
export default CopyLink;
