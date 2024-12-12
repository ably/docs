import ExamplesItem from './ExamplesItem';
import examples from '../../data/examples';

const ExamplesGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-32">
      {examples.examples.map(({ name, description, languages, products, useCases }, key) => (
        <ExamplesItem
          key={key}
          name={name}
          description={description}
          languages={languages}
          products={products}
          useCases={useCases}
        />
      ))}
    </div>
  );
};

export default ExamplesGrid;
