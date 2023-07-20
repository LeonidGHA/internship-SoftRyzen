import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from 'ui-kit/components/Spinner';

export const TestingWrapper = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
};
