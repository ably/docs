import React from 'react';
import Html from '../../Html';
import styled, { css } from 'styled-components';
import { borders } from '../../../../styles';
import { HtmlComponentProps } from 'src/components/html-component-props';
import { DlWrapper } from './DlWrapper';

const definitionListCell = css`
  border-bottom: ${borders.defaultBorder};
  height: 100%;
  padding: 15px 20px 15px 0;
`;

const StyledDl = styled.dl`
  border-top: ${borders.defaultBorder};
  display: grid;
  grid-auto-rows: minmax(min-content, max-content);
  grid-auto-flow: column;
  margin-bottom: 20px;

  div {
    display: contents;
  }
  dt {
    grid-column: 1;
    ${definitionListCell}
  }
  dd {
    ${definitionListCell}
  }
  dd > em:not(.italics):first-of-type {
    background: #e1e1e1;
    border-radius: 5px;
    padding: 2px 5px;
    ::before {
      content: '(default: ';
    }
    ::after {
      content: ')';
    }
  }
  dd > em.italics:last-of-type {
    float: right;
    display: block;
    text-align: right;
    font-size: 12px;
    margin-top: 12px;
  }
`;

const Dl = ({ data, attribs }: HtmlComponentProps<'dl'>) => {
  return (
    <StyledDl {...attribs}>
      <Html data={data} BlockWrapper={DlWrapper} />
    </StyledDl>
  );
};

export default Dl;
