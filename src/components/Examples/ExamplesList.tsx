import React from 'react';
import { examples } from '../../data/examples/';
import Link from '../Link';

const ExamplesList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-3">
      {examples.map((example) => (
        <Link
          key={example.name}
          to={example.id ? `/examples/${example.id}` : '#'}
          className="px-4 ui-text-label1 text-neutral-1000 dark:text-neutral-300 font-bold hover:text-neutral-1300 dark:hover:text-neutral-000"
        >
          {example.name}
        </Link>
      ))}
    </div>
  );
};

export default ExamplesList;
