import { navigate } from 'gatsby';
import { SingleValue } from 'react-select';
import { ReactSelectOption } from 'src/components';
import { DOCUMENTATION_PATH } from '../../../data/transform/constants';

export const routeToPage = (newValue: SingleValue<ReactSelectOption>) => {
  if (!newValue) {
    console.warn('No option selected from version menu');
    return;
  }
  navigate(`${DOCUMENTATION_PATH}${newValue.value}`);
};
