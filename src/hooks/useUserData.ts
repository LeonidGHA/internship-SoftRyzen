import { useSearchParams } from 'react-router-dom';

const useUserData = () => {
  const [searchParams] = useSearchParams();
  const userData = searchParams.get('userData');
  const parcedUserData = JSON.parse(decodeURIComponent(userData as string));
  const isParcedUserDataProper = parcedUserData
    ? Object.keys(parcedUserData).includes('accessToken') &&
      Object.keys(parcedUserData).includes('refreshToken')
    : false;
  const accessToken = parcedUserData?.accessToken;

  return { isParcedUserDataProper, accessToken };
};

export default useUserData;
