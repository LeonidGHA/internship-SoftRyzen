import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import logOutText from 'data/logOutText.json';
import useAppDispatch from 'hooks/useAppDispatch';
import { useAxiosConfig } from 'services/axiosConfig';

import { Button } from 'ui-kit/components/CommonsButtons/Button';

import { setError, logOutUser } from '../../../redux/auth/auth-slice';

import s from './LogOut.module.scss';

interface ILogOutProps {
  toggleModal: () => void;
}

export const LogOut: FC<ILogOutProps> = ({ toggleModal }) => {
  const [isLogOut, setIsLogOut] = useState(false);
  const [isEror, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { axiosPrivateInstance } = useAxiosConfig();

  let discardTimeout: NodeJS.Timeout | undefined;

  useEffect(() => {
    return () => {
      if (discardTimeout) {
        dispatch(logOutUser());
        clearTimeout(discardTimeout);
        window.location.replace(import.meta.env.VITE_MAIN_SITE_URL);
      }
    };
  }, [discardTimeout, dispatch]);

  const hadleClickExit = async () => {
    try {
      await axiosPrivateInstance.get('auth/logout').then((response) => {
        if (response.status === 200) {
          setIsLogOut(true);
          discardTimeout = setTimeout(() => {
            toggleModal();
          }, 3000);
        }
      });
    } catch (error) {
      setIsLogOut(true);
      setIsError(true);

      const newError = error as AxiosError;

      dispatch(setError(JSON.parse(newError.response?.request.response)));
    }
  };
  return (
    <div className={s.logOutWrapper}>
      {!isLogOut && (
        <>
          <h2 className={s.logOutTitle}>{logOutText.questionTitle}</h2>
          <div className={s.logOutBtnsWrapper}>
            <Button
              text={logOutText.btnBackText}
              lightVariant
              type="button"
              moreStyles={s.logOutBtnBack}
              onClick={toggleModal}
            />
            <Button
              text={logOutText.btnExitText}
              moreStyles={s.logOutBtnExit}
              onClick={hadleClickExit}
              type="button"
            />
          </div>
        </>
      )}
      {isLogOut && (
        <h2 className={s.logOutTitle}>
          {isEror ? logOutText.errorTitle : logOutText.successTitle}
        </h2>
      )}
    </div>
  );
};
