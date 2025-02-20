import React from 'react';
import examplesData from '../../data/examples';

const ExamplesList: React.FC = () => {
  return (
    <div className="flex flex-col gap-24 py-12">
      {examplesData.examples.map((example) => (
        <a
          key={example.name}
          href={'#'}
          className="px-16 ui-text-menu1 text-neutral-1000 dark:text-neutral-300 font-bold hover:text-neutral-1300 dark:hover:text-neutral-000"
        >
          {example.name}
        </a>
      ))}
    </div>
  );
};

export default ExamplesList;
