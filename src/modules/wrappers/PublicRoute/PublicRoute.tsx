import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useAppSelector from 'hooks/useAppSelector';

import { ROUTES } from 'routes/routes.const';

interface IPublicRouteProps {
  children?: ReactNode;
}

export const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};
