import { Example } from '../../data/examples';
import { SelectedFilters } from './ExamplesContent';

export const filterSearchExamples = (examples: Example[], selected: SelectedFilters, searchTerm: string) => {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return examples.filter(
    (example) =>
      (selected.products.length === 0 || example.products.some((product) => selected.products.includes(product))) &&
      (selected.useCases.length === 0 || example.useCases.some((useCase) => selected.useCases.includes(useCase))) &&
      (searchTerm === '' ||
        example.name.toLowerCase().includes(normalizedSearchTerm) ||
        example.description.toLowerCase().includes(normalizedSearchTerm) ||
        example.products.some((product) => product.toLowerCase().includes(normalizedSearchTerm)) ||
        example.useCases.some((useCase) => useCase.toLowerCase().includes(normalizedSearchTerm))),
  );
};
