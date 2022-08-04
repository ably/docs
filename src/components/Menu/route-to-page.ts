import { navigate } from 'gatsby';
import { SingleValue } from 'react-select';
import { DOCUMENTATION_PATH } from '../../../data/transform/constants';

export const routeToPage = (
  newValue: SingleValue<{
    label: string;
    value: string;
  }>,
) => {
  if (!newValue) {
    console.warn('No option selected from version menu');
    return;
  }
  navigate(`${DOCUMENTATION_PATH}${newValue.value}`);
};
