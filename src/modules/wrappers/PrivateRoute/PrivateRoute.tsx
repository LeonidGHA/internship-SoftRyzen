import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useAppSelector from 'hooks/useAppSelector';

import { ROUTES } from 'routes/routes.const';

interface IPrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};
