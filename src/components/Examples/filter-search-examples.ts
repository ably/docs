import { Example } from '../../data/examples';
import { ProductName } from '@ably/ui/core/ProductTile/data';

export const filterSearchExamples = (
  examples: Example[],
  selectedProducts: ProductName | string[],
  selectedUseCases: string[],
  searchTerm: string,
) => {
  return examples.filter(
    (example) =>
      (selectedProducts.length === 0 || example.products.some((product) => selectedProducts.includes(product))) &&
      (selectedUseCases.length === 0 || example.useCases.some((useCase) => selectedUseCases.includes(useCase))) &&
      (searchTerm === '' ||
        example.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase())) ||
        example.useCases.some((useCase) => useCase.toLowerCase().includes(searchTerm.toLowerCase()))),
  );
};
