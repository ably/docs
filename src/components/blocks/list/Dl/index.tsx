import Html from '../../Html';
import { HtmlComponentProps } from 'src/components/html-component-props';
import { DlWrapper } from './DlWrapper';
import { listDl } from '../list.module.css';

const Dl = ({ data, attribs }: HtmlComponentProps<'dl'>) => {
  return (
    <dl {...attribs} className={`${attribs?.className ? `${attribs.className} ` : ''}${listDl}`}>
      <Html data={data} BlockWrapper={DlWrapper} />
    </dl>
  );
};

export default Dl;
