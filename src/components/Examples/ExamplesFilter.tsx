import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'src/components/ui/Input';
import { products } from '../../data/examples';
import Button from 'src/components/ui/Button';
import cn from 'src/utilities/cn';
import Badge from 'src/components/ui/Badge';
import ExamplesCheckbox from './ExamplesCheckbox';
import { SelectedFilters } from './ExamplesContent';
import { useOnClickOutside } from 'src/hooks/use-on-click-outside';
import { navigate } from 'gatsby';
import { ProductName } from 'src/components/ui/ProductTile/data';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Matches Tailwind's `sm` screen (768px), where the filter switches from the
// mobile drawer (with an Apply button) to the inline desktop sidebar. Above
// this width selections must auto-commit, since no Apply button is rendered.
const SM_BREAKPOINT = 768;

const ExamplesFilter = ({
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

  const handleSelect = useCallback((e: ChangeEvent<HTMLInputElement>, filterType: keyof SelectedFilters) => {
    setLocalSelected((prevSelected) => {
      const params = new URLSearchParams(location.search);

      if (e.target.value === 'all') {
        if (filterType === 'products') {
          params.delete('product');
          navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        }

        return {
          ...prevSelected,
          [filterType]: [],
        };
      }

      const newSelected = prevSelected[filterType].includes(e.target.value as ProductName)
        ? prevSelected[filterType].filter((item) => item !== e.target.value)
        : [...prevSelected[filterType], e.target.value];

      if (filterType === 'products') {
        const params = new URLSearchParams(location.search);

        if (newSelected.length > 0) {
          params.set('product', newSelected.join(','));
        } else {
          params.delete('product');
        }

        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      }

      return {
        ...prevSelected,
        [filterType]: Array.from(new Set(newSelected)),
      };
    });
  }, []);

  const filters = useMemo(
    () => [
      {
        key: 'product',
        data: products,
        selected: localSelected.products,
        handleSelect: (e: ChangeEvent<HTMLInputElement>) => handleSelect(e, 'products'),
      },
    ],
    [localSelected.products, handleSelect],
  );

  const closeFilterMenu = useCallback(() => {
    setExpandFilterMenu(false);
    setLocalSelected(selected);
  }, [selected]);

  useOnClickOutside(closeFilterMenu, filterMenuRef);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= SM_BREAKPOINT) {
        setExpandFilterMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= SM_BREAKPOINT) {
      setSelected(localSelected);
    }
  }, [expandFilterMenu, localSelected, setSelected]);

  const activeFilters = useMemo(
    () => selected.products.length + selected.useCases.length,
    [selected.products, selected.useCases],
  );

  const handleApply = () => {
    setSelected(localSelected);
    setExpandFilterMenu(false);
  };

  return (
    <>
      <div className="relative w-full">
        <MagnifyingGlassIcon
          className="size-[16px] absolute left-3 top-1/2 -translate-y-1/2 z-10 text-neutral-600 dark:text-neutral-700 pointer-events-none"
          aria-hidden
        />
        <Input
          type="search"
          className="rounded bg-neutral-100 dark:bg-neutral-1200 pl-9 w-full h-10 sm:h-[2.125rem]"
          placeholder="Find an example..."
          autoComplete="off"
          aria-label="Search examples"
          role="searchbox"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Button
        className="flex sm:hidden mt-4 w-full"
        variant="secondary"
        leftIcon={<AdjustmentsHorizontalIcon aria-hidden />}
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
        <div className="flex justify-between items-center sm:hidden h-16 px-4 py-2 bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1100 rounded-t-2xl sm:rounded-none">
          <p className="ui-text-p1 font-bold text-neutral-1300 dark:text-neutral-000">Filters</p>
          <button onClick={closeFilterMenu} aria-label="Close filter menu">
            <XMarkIcon className="size-[24px]" aria-hidden />
          </button>
        </div>
        {filters.map(({ key, selected, handleSelect, data }) => (
          <div key={key} className="p-4 pt-6">
            <p className="ui-text-overline2 font-medium text-neutral-700">{key.replace(/-/g, ' ').toUpperCase()}</p>
            <div className="mt-2 flex ui-text-p4 flex-col gap-2">
              <ExamplesCheckbox
                label="All"
                name={`${key}-all`}
                value="all"
                disabled={selected.length === 0}
                isChecked={selected.length === 0}
                handleSelect={handleSelect}
              />
              {Object.entries(data).map(([itemKey, item]) => (
                <ExamplesCheckbox
                  key={itemKey}
                  label={item.label}
                  name={`${key}-${itemKey}`}
                  value={itemKey}
                  handleSelect={handleSelect}
                  isChecked={selected.includes(itemKey as ProductName)}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="sm:hidden p-4 flex gap-3">
          <Button
            className="w-full flex-1"
            variant="primary"
            disabled={
              localSelected.products.length === selected.products.length &&
              localSelected.useCases.length === selected.useCases.length &&
              localSelected.products.every((product) => selected.products.includes(product)) &&
              localSelected.useCases.every((useCase) => selected.useCases.includes(useCase))
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

export default ExamplesFilter;
