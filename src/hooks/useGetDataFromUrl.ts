import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

const useGetDataFromUrl = <T>(nameParams: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataParams = searchParams.get(nameParams);
  const location = useLocation();

  let data: T | null = null;
  if (dataParams) {
    data = JSON.parse(dataParams) as T;
  }

  useEffect(() => {
    if (dataParams && location.pathname === '/') {
      setSearchParams('');
    }
  }, [setSearchParams, dataParams, location]);
  return { dataParams, data, location };
};

export default useGetDataFromUrl;
