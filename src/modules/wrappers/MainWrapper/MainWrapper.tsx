import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { MainHeader } from 'modules/headers/MainHeader';
import { Sidebar } from 'ui-kit/components/SideBar/SideBar';
import { Spinner } from 'ui-kit/components/Spinner';

import { useCurrentWidth } from 'hooks/useCurrentWidth';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import {
  ProgressStatusType,
  updateStatus,
} from '../../../redux/progressStatus/progressStatusSlice';
import { userData } from '../../../redux/auth/auth-selectors';
import { progressStatus } from '../../../redux/progressStatus/progressStatusSelectors';
import { getIsOver } from 'utils/getIsOver';

import sidebarLocalStorageKey from 'constants/sidebarLocalStorageKey.json';

import s from './MainWrapper.module.scss';

export const MainWrapper = () => {
  const user = useAppSelector(userData);
  const status = useAppSelector(progressStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stageState: Partial<ProgressStatusType> = {
      test: {
        isActive: user?.direction ? true : false,
        isFailed: getIsOver(user?.test?.endDate) && !user?.test.isSuccess,
        isSuccess: user?.test.isSuccess,
      },
      task: {
        isActive: status.test.isSuccess,
        // isFailed: getIsOver(user?.task?.deadlineDate) && !user?.task.isSuccess,
        isFailed: false, // Тестове після відкриття не фейлиться
        isSuccess: user?.task.isSuccess,
      },
    };

    dispatch(updateStatus(stageState));
  }, [dispatch, status.test.isSuccess, user]);

  const innerWidth = useCurrentWidth();
  const isDesktopWidth = innerWidth >= 1440;

  const LSHasSidebarState = localStorage.getItem(sidebarLocalStorageKey.key);
  const serializedSidebarState = LSHasSidebarState
    ? false
    : LSHasSidebarState === 'true'
    ? true
    : false;

  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
  const [isSidebarShort, setIsSidebarShort] = useState<boolean>(serializedSidebarState);

  const finallySidebarShown = isDesktopWidth ? true : isSidebarHidden;

  const toggleSidebar = (): void => {
    setIsSidebarHidden((prevState) => !prevState);
  };

  const defineSidebarState = (state: boolean): void => {
    setIsSidebarShort(!state);
  };

  return (
    <>
      <MainHeader isLogoShort={isSidebarShort} onClick={toggleSidebar} />
      <main className={s.main}>
        <Sidebar
          onClick={toggleSidebar}
          onTogglerClick={defineSidebarState}
          isShown={finallySidebarShown}
        />
        <div className={s.contentWrapper}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};
