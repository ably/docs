import Link from 'src/components/Link';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';

type TileProps = {
  title?: string;
  description?: string;
  image?: IconName;
  link?: string;
};

const Tile = ({ title, description, image, link = '/docs' }: TileProps) => {
  return (
    <Link to={link} className="block no-underline">
      <section
        className="flex items-start gap-4 p-4 bg-neutral-100 dark:bg-neutral-1200 rounded-lg border border-neutral-300 dark:border-neutral-1000
        transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-1100 hover:border-neutral-400 dark:hover:border-neutral-900 min-h-[112px]"
      >
        <div className="w-12 h-12 bg-neutral-000 dark:bg-neutral-1300 rounded-xl p-2.5 flex items-center justify-center flex-shrink-0">
          {image && <Icon name={image} size="2rem" />}
        </div>
        <div className="flex-1 max-w-66">
          <h3 className="text-lg font-bold leading-tight tracking-tight mb-2 text-neutral-1300">{title}</h3>
          <p className="text-sm font-medium leading-relaxed tracking-normal text-neutral-800 dark:text-neutral-500 max-h-11 overflow-hidden">
            {description}
          </p>
        </div>
      </section>
    </Link>
  );
};

export const Tiles = ({ children }: { children: TileProps[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children
        .filter((item) => item.title && item.description)
        .map((item: TileProps) => (
          <Tile key={`${item.title}${item.description}`} {...item} />
        ))}
    </div>
  );
};
