import Icon from '@ably/ui/core/Icon';
import { LinkProps } from '../../ProductPageContent';
import Link from '../../../Link';

export const Links = ({ links }: { links?: LinkProps[] }) =>
  links ? (
    <>
      <div className="mt-auto">
        {links.length === 1 && (
          <div>
            {links.map(({ href, external, text }, index) => {
              return (
                <div key={index + text} className="h-full flex items-center">
                  <Link
                    to={href}
                    external={external}
                    className="text-gui-default font-medium mr-4"
                    target="_blank"
                    rel="noopener"
                  >
                    {text}
                  </Link>
                  <Icon name="icon-gui-arrow-right" size="1rem" />
                </div>
              );
            })}
          </div>
        )}
        {links.length > 1 && (
          <ul className="ui-unordered-list" style={{ marginLeft: '0.75rem', marginBottom: '0' }}>
            {links.map(({ href, external, text }, index) => {
              return (
                <li key={index + text}>
                  <Link
                    to={href}
                    external={external}
                    className="text-gui-default"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  ) : null;
