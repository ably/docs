import { PropsWithChildren } from 'react';
import { bannerContainer, bannerContent } from './banners.module.css';

type BannerProps = PropsWithChildren<{
  headline?: string;
}>;

const Banner = ({ children, headline }: BannerProps) => {
  return (
    <div className={bannerContainer}>
      <div className={bannerContent}>
        {headline && <h3 className="ui-text-h3 font-bold text-neutral-1300 mb-12">{headline}</h3>}
        <div className="ui-text-p2 text-neutral-1000">{children}</div>
      </div>
    </div>
  );
};

export default Banner;
