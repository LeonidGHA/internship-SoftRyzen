import { useEffect } from 'react';

import { Title } from 'ui-kit/components/typography/Title';
import { UpdatePassForm } from 'modules/forms/UpdatePassForm';
import { TextBtnNavLink } from 'ui-kit/components/CommonsButtons/TextBtnNavLink';
import { Spinner } from 'ui-kit/components/Spinner';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';

import { isAuthLoading } from '../../../redux/auth/auth-selectors';
import { clearEmailForRecover } from '../../../redux/auth/auth-slice';

import { ROUTES } from 'routes/routes.const';
import newPasswordForm from 'data/newPasswordForm.json';

import s from './NewPasswordForm.module.scss';

export const NewPasswordForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isAuthLoading);

  useEffect(() => {
    dispatch(clearEmailForRecover());
  }, []);

  return (
    <>
      <Title Tag="h1" className={s.title}>
        {newPasswordForm.title}
      </Title>
      <p className={s.par}>{newPasswordForm.text}</p>
      <UpdatePassForm />
      <TextBtnNavLink
        textBeforeLink={newPasswordForm.blueLink.textBeforeLink}
        textLink={newPasswordForm.blueLink.linkText}
        path={ROUTES.LOGIN}
        underlineLink
        textSize="12"
        fontWeightText="600"
        arrow
        color="blue"
        classNameText={s.blueLink}
      />
      {isLoading && <Spinner />}
    </>
  );
};
