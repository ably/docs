import { useLocation } from '@reach/router';

export const useUrlParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Function to get parameter value by name
  const getParam = (name: string) => searchParams.get(name);

  return {
    getParam,
  };
};
