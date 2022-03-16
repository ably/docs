import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';

const StyledH5 = styled.h5`
  ${fonts.h5};
  margin: ${spacing.small} 0 ${spacing.small};
`;

const H5 = LinkableHtmlBlock(StyledH5);

export default H5;
