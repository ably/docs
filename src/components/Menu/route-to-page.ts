import { navigate } from 'gatsby';
import { SingleValue } from 'react-select';
import { DOCUMENTATION_PATH } from '../../../data/transform/constants';
import { ReactSelectOption } from './react-select-option-types';

export const routeToPage = (newValue: SingleValue<ReactSelectOption>) => {
  if (!newValue) {
    console.warn('No option selected from version menu');
    return;
  }
  navigate(`${DOCUMENTATION_PATH}${newValue.value}`);
};
