import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from 'ui-kit/components/Spinner';

import s from './AuthWrapper.module.scss';

export const AuthWrapper = () => {
  return (
    <main className={s.main}>
      <div className={s.decor}></div>
      <div className={s.authContainer}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};
