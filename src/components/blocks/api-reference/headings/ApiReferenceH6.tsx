import styled from 'styled-components';
import GenericHtmlBlock from '../../Html/GenericHtmlBlock';

const StyledApiReferenceH6 = styled.h6`
  align-items: center;
  padding: 4px 6px;
  background: #ffe6dc;
  margin-top: 10px;
  margin-bottom: 24px;
  border: 1px solid #ff9e7a;
  border-radius: 2px;
  width: fit-content;
`;

export const ApiReferenceH6 = GenericHtmlBlock(StyledApiReferenceH6);
