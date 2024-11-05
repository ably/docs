import cn from '@ably/ui/core/utils/cn';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const Dd: React.FC<{ className?: string }> = (props) => <dd {...props} className={cn(props.className)} />;

export default GenericHtmlBlock(Dd);
