import React, { ComponentProps } from 'react';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import Html from 'src/components/blocks/Html';
import HtmlDataTypes from '../../../../data/types/html';

type Props = { data: HtmlComponentProps<ValidReactElement>[]; attribs: ComponentProps<'tr'> };

const Tr = ({ data, attribs }: Props) => (
  <tr className="border-b border-light-grey" {...attribs}>
    <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
  </tr>
);

export default Tr;
