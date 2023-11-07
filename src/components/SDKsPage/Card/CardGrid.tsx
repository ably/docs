import { container } from '../sdks.module.css';
import Card, { CardProps } from './';

const CardGrid = ({ currentProduct }: { currentProduct: CardProps[] }) => {
  return (
    <div
      className={`${container} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16`}
      style={{ paddingBottom: '160px' }}
    >
      {currentProduct.map((item) => (
        <Card key={item.title + item.text} {...item} />
      ))}
    </div>
  );
};

export default CardGrid;
