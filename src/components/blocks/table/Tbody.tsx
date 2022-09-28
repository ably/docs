import React, { ComponentProps } from 'react';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import Html from 'src/components/blocks/Html';
import HtmlDataTypes from '../../../../data/types/html';

type Props = {
  data: HtmlComponentProps<ValidReactElement>[];
  attribs: ComponentProps<'tbody'>;
};

const Tbody = ({ data, attribs }: Props) => (
  <tbody {...attribs}>
    <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
  </tbody>
);

export default Tbody;
