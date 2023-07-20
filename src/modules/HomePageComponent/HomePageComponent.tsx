import { FormController } from 'modules/FormController';

import useAppSelector from 'hooks/useAppSelector';
import { userData } from '../../redux/auth/auth-selectors';
import { Dashboard } from 'modules/Dashboard';

export const HomePageComponent = () => {
  const user = useAppSelector(userData);

  return (
    <>
      {!user.direction && <FormController />}
      {user.direction && <Dashboard />}
    </>
  );
};
