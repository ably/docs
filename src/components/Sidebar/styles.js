import { css } from 'styled-components';
import { colors, fonts, fontWeights, mq, spacing } from '../../styles';

// Adapted from: Ably/Voltaire src/components/table-of-contents/heading.js
const SidebarHeadingStyle = css`
  ${fonts.efficientBody}
  font-weight: ${({ $leaf }) => ($leaf ? fontWeights.normal : fontWeights.bold)};

  display: block;
  padding: ${spacing.small};
  text-decoration: none;
  margin-left: ${({ $leaf, indent }) => `${($leaf ? 4 : 0) + (indent ?? 0)}px`};

  color: ${({ active }) => (active ? colors.text.linkHoverAlternate : colors.text.link)};
  border-left: ${({ active, $leaf }) =>
    active
      ? `${$leaf ? 1 : 2}px solid ${colors.text.linkHoverAlternateMuted}`
      : `${$leaf ? 1 : 2}px solid transparent`};

  &:hover {
    color: ${colors.text.linkHoverAlternate};
    border-left: ${({ $leaf }) => ($leaf ? 1 : 2)}px solid ${colors.text.linkHoverAlternateMuted};
  }

  ${mq.minWidth.small} {
    padding: ${spacing.xsmall} ${spacing.small};
  }
`;

export { SidebarHeadingStyle };
