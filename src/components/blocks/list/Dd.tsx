import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Dd: React.FC<{ className?: string }> = (props) => (
  <dd {...props} className={`${props.className ? `${props.className} ` : ''}font-light`} />
);

export default GenericHtmlBlock(Dd);
