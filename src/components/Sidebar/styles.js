import { css } from 'styled-components';
import { colors, fonts, fontWeights, mq, spacing } from '../../styles';

// Adapted from: Ably/Voltaire src/components/table-of-contents/heading.js
const SidebarHeadingStyle = css`
  ${fonts.efficientBody}
  font-weight: ${({ $leaf }) => ($leaf ? fontWeights.normal : fontWeights.bold)};

  display: block;
  padding: ${spacing.small};
  text-decoration: none;
  margin-left: ${({ indent }) => `${indent ?? 0}px`};

  color: ${({ $active }) => ($active ? colors.text.linkHoverAlternate : colors.text.link)};

  &:hover {
    color: ${colors.text.linkHoverAlternate};
  }

  ${mq.minWidth.small} {
    padding: ${spacing.xsmall} ${spacing.small};
  }
`;

export { SidebarHeadingStyle };
