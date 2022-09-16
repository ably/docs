import styled from 'styled-components';
import { fonts, spacing } from '../../../styles';
import LinkableHtmlBlock from '../Html/LinkableHtmlBlock';

const small: string = spacing.small.toString();

const StyledH5 = styled.h5`
  ${fonts.h5};
  margin: ${small} 0 ${small};
`;

const H5 = LinkableHtmlBlock(StyledH5);

export default H5;
