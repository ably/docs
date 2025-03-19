import Html from '../../Html';
import { HtmlComponentProps } from 'src/components/html-component-props';
import { DlWrapper } from './DlWrapper';
import { listDl } from '../list.module.css';
import cn from '@ably/ui/core/utils/cn';

const Dl = ({ data, attribs }: HtmlComponentProps<'dl'>) => {
  return (
    <dl {...attribs} className={cn(attribs?.className, listDl, 'ui-text-p2 max-w-[calc(100vw-48px)] sm:max-w-full')}>
      <Html data={data} BlockWrapper={DlWrapper} />
    </dl>
  );
};

export default Dl;
