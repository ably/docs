import { Example } from '../../data/examples';
import { ProductName } from '@ably/ui/core/ProductTile/data';

export const filterSearchExamples = (
  examples: Example[],
  selectedProducts: ProductName | string[],
  selectedUseCases: string[],
) => {
  return examples.filter(
    (example) =>
      (selectedProducts.includes('all') || example.products.some((product) => selectedProducts.includes(product))) &&
      (selectedUseCases.includes('all') || example.useCases.some((useCase) => selectedUseCases.includes(useCase))),
  );
};
