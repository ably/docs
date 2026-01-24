import { Guide, GuideProduct, AIProvider } from '../../data/guides/types';

export type SelectedFilters = {
  products: GuideProduct[];
  aiProviders: AIProvider[];
};

export const filterSearchGuides = (guides: Guide[], selected: SelectedFilters, searchTerm: string) => {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return guides.filter((guide) => {
    // Product filter logic
    const matchesProduct =
      selected.products.length === 0 || guide.products.some((product) => selected.products.includes(product));

    // AI Provider sub-filter logic (only applies when ai-transport is selected)
    const hasAITransportSelected = selected.products.includes('ai-transport');
    const matchesAIProvider =
      !hasAITransportSelected ||
      selected.aiProviders.length === 0 ||
      (guide.aiProvider && selected.aiProviders.includes(guide.aiProvider));

    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      guide.name.toLowerCase().includes(normalizedSearchTerm) ||
      guide.description.toLowerCase().includes(normalizedSearchTerm) ||
      guide.products.some((product) => product.toLowerCase().includes(normalizedSearchTerm));

    return matchesProduct && matchesAIProvider && matchesSearch;
  });
};
