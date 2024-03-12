import Icon from '@ably/ui/core/Icon';
import Link from 'src/components/Link';
import { btn_sdks } from '../sdks.module.css';

type ImagesSDK = {
  src: string;
  isWide: boolean;
};

export type CardProps = {
  githubRepoURL: string;
  setupLink: string;
  image: ImagesSDK;
  title: string;
  text: string;
};

const Card = ({ githubRepoURL, setupLink, title, image, text }: CardProps) => {
  return (
    <section className="p-24 bg-extra-light-grey rounded-lg flex-1">
      <div className="flex items-center justify-between">
        <h3 className="font-next-book font-medium text-cool-black text-h3">{title}</h3>
        <img key={image.src} src={image.src} height="40px" width={`${image.isWide ? '68px' : '40px'}`} />
      </div>
      <p className="text-p3 text-dark-grey py-16 font-light">{text}</p>
      <div className="flex flex-col justify-center gap-8">
        <Link to={setupLink} rel="noreferrer" className={`${btn_sdks} ui-btn text-btn4 gap-8`}>
          Setup <Icon name="icon-gui-arrow-right" size="1rem" />
        </Link>
        <a
          href={githubRepoURL}
          target="_blank"
          rel="noreferrer"
          className={`${btn_sdks} ui-btn-secondary text-btn4 gap-8 align-middle`}
        >
          <span className="relative top-1">GitHub</span> <Icon name="github" size="1.125rem" />
        </a>
      </div>
    </section>
  );
};

export default Card;
