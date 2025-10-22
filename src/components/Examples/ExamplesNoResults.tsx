import Badge from '@ably/ui/core/Badge';
import { Link } from 'gatsby';

const ExamplesNoResults = () => {
  const popularSearchTerm = ['Avatar stack', 'Live Cursors', 'Occupancy', 'Presence'];
  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <p className="ui-text-h2" role="img" aria-label="Face with peeking eye">
        🫣
      </p>
      <p className="ui-text-p1 mt-3 text-neutral-1300 font-bold">No matching examples found</p>
      <p className="ui-text-p3 mt-6 text-neutral-1100">Try these popular search terms</p>
      <div className="flex mt-2 gap-x-1.5">
        {popularSearchTerm.map((term) => (
          <Badge key={`search-term-${term}`} className="text-neutral-1300 ui-text-label3 font-medium">
            {term}
          </Badge>
        ))}
      </div>
      <p className="mt-4 ui-text-p3 text-neutral-1000">
        or{' '}
        <Link to="/support" className="ui-link">
          Suggest an example
        </Link>
      </p>
    </div>
  );
};

export default ExamplesNoResults;
