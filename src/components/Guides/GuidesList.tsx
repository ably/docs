import React from 'react';
import { guides } from '../../data/guides';
import Link from '../Link';

const GuidesList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-3">
      {guides.map((guide) => (
        <Link
          key={guide.name}
          to={guide.link}
          className="px-4 ui-text-label1 text-neutral-1000 dark:text-neutral-300 font-bold hover:text-neutral-1300 dark:hover:text-neutral-000"
        >
          {guide.name}
        </Link>
      ))}
    </div>
  );
};

export default GuidesList;
