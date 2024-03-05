import Icon from '@ably/ui/core/Icon';
import { CardProps } from '../../HomepageContent';
import Link from '../../../Link';
import { StaticImage } from '../../../StaticImage';

export const SdkCard = ({ title, content, image, callToAction }: CardProps) => (
  <div className="border border-extra-light-grey rounded-lg bg-extra-light-grey flex flex-col sm:flex-row p-24 md:p-40">
    <div className="mr-40 flex flex-col">
      <h2 className="ui-text-h2 mb-16">{title}</h2>
      <p className="ui-text-p1 mb-40">{content}</p>

      {callToAction ? (
        <div className="mt-auto mb-40 sm:mb-0">
          <Link to={callToAction.href} external={callToAction.external} className="ui-btn">
            {callToAction.text}
            <Icon name="icon-gui-arrow-right" size="1.5rem" color="text-white" additionalCSS="ml-8 -mr-12" />
          </Link>
        </div>
      ) : null}
    </div>

    <StaticImage src={`/images/homepage/${image}@2x.png`} style={{ maxWidth: '409px' }} />
  </div>
);
