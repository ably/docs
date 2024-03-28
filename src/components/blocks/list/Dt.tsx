import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { listDt } from './list.module.css';

const Dt: React.FC<{ className?: string }> = (props) => (
  <dt {...props} className={`${props.className ? `${props.className} ` : ''}${listDt}`} />
);

export default GenericHtmlBlock(Dt);
