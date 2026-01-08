import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@ably/ui/core/Icon';
import { products, aiProviders } from '../../data/guides';
import Button from '@ably/ui/core/Button';
import cn from '@ably/ui/core/utils/cn';
import Badge from '@ably/ui/core/Badge';
import GuidesCheckbox from './GuidesCheckbox';
import { SelectedFilters } from './filter-search-guides';
import { useOnClickOutside } from 'src/hooks/use-on-click-outside';
import { navigate } from 'gatsby';
import { GuideProduct, AIProvider } from '../../data/guides/types';

const GuidesFilter = ({
  selected,
  setSelected,
  handleSearch,
}: {
  selected: SelectedFilters;
  setSelected: Dispatch<SetStateAction<SelectedFilters>>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [expandFilterMenu, setExpandFilterMenu] = useState(false);
  const [localSelected, setLocalSelected] = useState<SelectedFilters>(selected);

  const handleSelectProduct = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalSelected((prevSelected) => {
      const params = new URLSearchParams(location.search);

      if (e.target.value === 'all') {
        params.delete('product');
        params.delete('provider');
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });

        return {
          products: [],
          aiProviders: [],
        };
      }

      const value = e.target.value as GuideProduct;
      const newProducts = prevSelected.products.includes(value)
        ? prevSelected.products.filter((item) => item !== value)
        : [...prevSelected.products, value];

      // When AI Transport is toggled, select/deselect all sub-filters
      let newAIProviders = prevSelected.aiProviders;
      if (value === 'ai-transport') {
        if (prevSelected.products.includes('ai-transport')) {
          // Deselecting AI Transport - clear all sub-filters
          newAIProviders = [];
          params.delete('provider');
        } else {
          // Selecting AI Transport - select all sub-filters
          newAIProviders = ['anthropic', 'langchain', 'openai', 'vercel'];
          params.set('provider', newAIProviders.join(','));
        }
      }

      if (newProducts.length > 0) {
        params.set('product', newProducts.join(','));
      } else {
        params.delete('product');
      }

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });

      return {
        products: Array.from(new Set(newProducts)),
        aiProviders: newAIProviders,
      };
    });
  }, []);

  const handleSelectAIProvider = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalSelected((prevSelected) => {
      const params = new URLSearchParams(location.search);
      const value = e.target.value as AIProvider;

      const newProviders = prevSelected.aiProviders.includes(value)
        ? prevSelected.aiProviders.filter((item) => item !== value)
        : [...prevSelected.aiProviders, value];

      // Auto-manage AI Transport selection based on sub-filters
      let newProducts = [...prevSelected.products];
      if (newProviders.length > 0 && !prevSelected.products.includes('ai-transport')) {
        // If selecting a sub-filter, also select AI Transport
        newProducts.push('ai-transport');
        params.set('product', newProducts.join(','));
      } else if (newProviders.length === 0 && prevSelected.products.includes('ai-transport')) {
        // If all sub-filters deselected, also deselect AI Transport
        newProducts = newProducts.filter((p) => p !== 'ai-transport');
        if (newProducts.length > 0) {
          params.set('product', newProducts.join(','));
        } else {
          params.delete('product');
        }
      }

      if (newProviders.length > 0) {
        params.set('provider', newProviders.join(','));
      } else {
        params.delete('provider');
      }

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });

      return {
        products: Array.from(new Set(newProducts)),
        aiProviders: Array.from(new Set(newProviders)),
      };
    });
  }, []);

  const closeFilterMenu = useCallback(() => {
    setExpandFilterMenu(false);
    setLocalSelected(selected);
  }, [selected]);

  useOnClickOutside(closeFilterMenu, filterMenuRef);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1040) {
        setExpandFilterMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1040) {
      setSelected(localSelected);
    }
  }, [expandFilterMenu, localSelected, setSelected]);

  const activeFilters = useMemo(
    () => localSelected.products.length + localSelected.aiProviders.length,
    [localSelected.products, localSelected.aiProviders],
  );

  const handleApply = () => {
    setSelected(localSelected);
    setExpandFilterMenu(false);
  };

  return (
    <>
      <div className="h-[2.125rem] sm:h-[1.875rem] w-5 absolute left-2 top-1 flex items-center justify-center select-none cursor-default">
        <Icon name={'icon-gui-magnifying-glass-outline'} size="1rem" />
      </div>
      <input
        type="search"
        className="ui-input pl-9 w-full h-10 sm:h-[2.125rem] ui-text-p3"
        placeholder="Find a guide"
        autoComplete="off"
        aria-label="Search guides"
        role="searchbox"
        onChange={(e) => handleSearch(e)}
      />
      <Button
        className="flex sm:hidden mt-4 w-full"
        variant="secondary"
        leftIcon="icon-gui-adjustments-horizontal-outline"
        onClick={() => setExpandFilterMenu(true)}
      >
        Filter
        {activeFilters > 0 ? <Badge>{activeFilters}</Badge> : null}
      </Button>
      {expandFilterMenu &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-neutral-1300 opacity-10 z-20" onClick={() => setExpandFilterMenu(false)} />,
          document.body,
        )}
      <div
        ref={filterMenuRef}
        className={cn(
          'fixed bottom-0 bg-white dark:bg-neutral-1300 z-30 w-full left-0 gap-5 mt-5 translate-y-full sm:static sm:translate-y-0 sm:flex sm:flex-col sm:bg-transparent sm:z-0 transition-[transform,colors] sm:transition-colors rounded-t-2xl sm:rounded-none max-h-[calc(100%-64px)] overflow-y-scroll',
          {
            'translate-y-0': expandFilterMenu,
          },
        )}
      >
        <div className="flex justify-between items-center sm:hidden h-16 px-4 py-2 bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-t-2xl sm:rounded-none">
          <p className="ui-text-p1 font-bold text-neutral-1300 dark:text-neutral-000">Filters</p>
          <button onClick={closeFilterMenu} aria-label="Close filter menu">
            <Icon name="icon-gui-x-mark-outline" size="24px" />
          </button>
        </div>

        {/* Product filters */}
        <div className="p-4 pt-6">
          <p className="ui-text-overline2 font-medium text-neutral-700">PRODUCT</p>
          <div className="mt-2 flex ui-text-p4 flex-col gap-2">
            <GuidesCheckbox
              label="All"
              name="product-all"
              value="all"
              disabled={localSelected.products.length === 0}
              isChecked={localSelected.products.length === 0}
              handleSelect={handleSelectProduct}
            />
            {Object.entries(products).map(([key, product]) => (
              <div key={key}>
                <GuidesCheckbox
                  label={product.label}
                  name={`product-${key}`}
                  value={key}
                  handleSelect={handleSelectProduct}
                  isChecked={localSelected.products.includes(key as GuideProduct)}
                />
                {/* AI provider sub-filters - always visible under AI Transport */}
                {key === 'ai-transport' && (
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    {Object.entries(aiProviders).map(([providerKey, provider]) => (
                      <GuidesCheckbox
                        key={providerKey}
                        label={provider.label}
                        name={`provider-${providerKey}`}
                        value={providerKey}
                        handleSelect={handleSelectAIProvider}
                        isChecked={localSelected.aiProviders.includes(providerKey as AIProvider)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sm:hidden p-4 flex gap-3">
          <Button
            className="w-full flex-1"
            variant="primary"
            disabled={
              localSelected.products.length === selected.products.length &&
              localSelected.aiProviders.length === selected.aiProviders.length &&
              localSelected.products.every((product) => selected.products.includes(product)) &&
              localSelected.aiProviders.every((provider) => selected.aiProviders.includes(provider))
            }
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};

export default GuidesFilter;
