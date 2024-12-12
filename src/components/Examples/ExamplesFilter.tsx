import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@ably/ui/core/Icon';
import { products } from '@ably/ui/core/ProductTile/data';
import ExamplesCheckbox from './ExamplesCheckbox';
import examples from '../../data/examples';
import Button from '@ably/ui/core/Button';
import cn from '@ably/ui/core/utils/cn';
import { useOnClickOutside } from 'src/hooks';
import Badge from '@ably/ui/core/Badge';
import { SelectedFilters } from './ExamplesContent';

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
      if (e.target.value === 'all') {
        return {
          ...prevSelected,
          [filterType]: [],
        };
      }

      const newSelected = prevSelected[filterType].includes(e.target.value)
        ? prevSelected[filterType].filter((item) => item !== e.target.value)
        : [...prevSelected[filterType], e.target.value];

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
      {
        key: 'use-case',
        data: examples.useCases,
        selected: localSelected.useCases,
        handleSelect: (e: ChangeEvent<HTMLInputElement>) => handleSelect(e, 'useCases'),
      },
    ],
    [localSelected.products, localSelected.useCases, handleSelect],
  );

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
    () => selected.products.length + selected.useCases.length,
    [selected.products, selected.useCases],
  );

  const handleApply = () => {
    setSelected(localSelected);
    setExpandFilterMenu(false);
  };

  return (
    <>
      <div className="h-[34px] sm:h-[30px] w-20 absolute left-8 top-4 flex items-center justify-center select-none cursor-default">
        <Icon name={'icon-gui-magnifying-glass-outline'} size="1rem" />
      </div>
      <input
        type="search"
        className="ui-input pl-36 w-full h-40 sm:h-34 ui-text-p3"
        placeholder="Find an example"
        autoComplete="off"
        aria-label="Search examples"
        role="searchbox"
        onChange={(e) => handleSearch(e)}
      />
      <Button
        className="flex sm:hidden mt-16 w-full"
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
          'fixed bottom-0 bg-white dark:bg-neutral-1300 z-30 w-full left-0 gap-20 mt-20 translate-y-full sm:static sm:translate-y-0 sm:flex sm:flex-col sm:bg-transparent sm:z-0 transition-[transform,colors] sm:transition-colors rounded-t-2xl sm:rounded-none max-h-[calc(100%-64px)] overflow-y-scroll',
          {
            'translate-y-0': expandFilterMenu,
          },
        )}
      >
        <div className="flex justify-between items-center sm:hidden h-64 px-16 py-8 bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-t-2xl sm:rounded-none">
          <p className="ui-text-p1 font-bold text-neutral-1300 dark:text-neutral-000">Filters</p>
          <button onClick={closeFilterMenu} aria-label="Close filter menu">
            <Icon name="icon-gui-x-mark-outline" size="24px" />
          </button>
        </div>
        {filters.map(({ key, selected, handleSelect, data }) => (
          <div key={key} className="p-16 pt-24">
            <p className="ui-text-overline2 font-medium text-neutral-700">{key.replace(/-/g, ' ').toUpperCase()}</p>
            <div className="mt-8 flex ui-text-p4 flex-col gap-8">
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
                  isChecked={selected.includes(itemKey)}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="sm:hidden p-16 flex gap-12">
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
