import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';

const ExamplesItem = ({
  name,
  description,
  languages,
  products,
  useCases,
}: {
  name: string;
  description: string;
  languages: string[];
  products: string[];
  useCases: string[];
}) => {
  return (
    <div className="w-full">
      <div className="bg-neutral-100 h-256 sm:h-200 relative">
        <div className="flex bg-neutral-000 gap-x-6 py-6 px-8 absolute right-12 bottom-12 rounded	border border-neutral-200 z-20">
          {languages
            ? languages.map((language) => (
                <Icon key={language} name={`icon-tech-${language}` as IconName} size="18px" />
              ))
            : null}
        </div>
      </div>
      <p className="ui-text-h4 mt-16 text-neutral-1300">{name}</p>
      <p className="ui-text-p3 mt-8 text-neutral-900">{description}</p>
      <div className="mt-16 flex gap-x-4">
        {products
          ? products.map((product) => (
              <Badge key={product} className="text-orange-700">
                {product}
              </Badge>
            ))
          : null}

        {useCases ? useCases.map((useCase) => <Badge key={useCase}>{useCase}</Badge>) : null}
      </div>
    </div>
  );
};

export default ExamplesItem;
