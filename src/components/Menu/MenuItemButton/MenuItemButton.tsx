import React, { FunctionComponent as FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { button, isActive } from './MenuItemButton.module.css';
import { languageSDKInterfaceClean } from '../../LanguageButton/LanguageButton';

type Props = {
  isSelected?: boolean;
  selectedSDKInterfaceTab: string;
  language: string;
} & HTMLAttributes<HTMLButtonElement>;

const MenuItemButton: FC<Props> = ({ isSelected = false, selectedSDKInterfaceTab, ...props }) => {
  let filterLanguage = props.language;
  if (selectedSDKInterfaceTab) {
    filterLanguage = props ? languageSDKInterfaceClean(props.language, selectedSDKInterfaceTab) : '';
    props = { ...props, language: filterLanguage };
  }
  return (
    <>
      {filterLanguage != '' ? (
        <button
          className={cn(button, {
            [isActive]: isSelected,
          })}
          {...props}
        />
      ) : null}
    </>
  );
};
export default MenuItemButton;
