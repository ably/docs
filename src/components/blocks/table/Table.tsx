import React from 'react';
import cn from 'classnames';
import Html from 'src/components/blocks/Html';
import { HtmlComponentProps } from 'src/components/html-component-props';
import HtmlDataTypes from '../../../../data/types/html';

import { table, tableContainer } from './Table.module.css';

const Table = ({ data, attribs }: HtmlComponentProps<'table'>) => {
  if (!data || typeof data === 'string') {
    return null;
  }

  return (
    <div className={tableContainer}>
      <table className={cn('border-0 border-collapse mb-4 border-spacing-0 text-menu2 text-left', table)} {...attribs}>
        <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
      </table>
    </div>
  );
};

export default Table;
