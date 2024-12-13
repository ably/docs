import ExamplesItem from './ExamplesItem';

const ExamplesGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-x-20 gap-y-32">
      <ExamplesItem />
      <ExamplesItem />
      <ExamplesItem />
      <ExamplesItem />
      <ExamplesItem />
      <ExamplesItem />
    </div>
  );
};

export default ExamplesGrid;
