import { Title } from 'ui-kit/components/typography/Title';
import { CheckEmailForm } from 'modules/forms/CheckEmailForm';
import { TextBtnNavLink } from 'ui-kit/components/CommonsButtons/TextBtnNavLink';
import { TextNavLink } from 'ui-kit/components/CommonsButtons/TextNavLink';
import { Spinner } from 'ui-kit/components/Spinner';

import useAppSelector from 'hooks/useAppSelector';

import { isAuthLoading } from '../../../redux/auth/auth-selectors';

import { ROUTES } from 'routes/routes.const';
import forgetPasswordForm from 'data/forgetPasswordForm.json';

import s from './ForgetPasswordForm.module.scss';

export const ForgetPasswordForm = () => {
  const isLoading = useAppSelector(isAuthLoading);

  return (
    <>
      <Title className={s.title} Tag="h1">
        {forgetPasswordForm.title}
      </Title>
      <p className={s.text}>{forgetPasswordForm.text}</p>
      <CheckEmailForm />
      <TextBtnNavLink
        textBeforeLink={forgetPasswordForm.blueLink.textBeforeLink}
        textLink={forgetPasswordForm.blueLink.linkText}
        path={ROUTES.LOGIN}
        underlineLink
        textSize="12"
        fontWeightText="600"
        arrow
        color="blue"
        classNameText={s.blueLink}
        classNameLink={s.linkText}
      />
      <TextNavLink
        textBeforeLink={forgetPasswordForm.subtext.textBeforeLink}
        textLink={forgetPasswordForm.subtext.linkText}
        path={ROUTES.REGISTER}
        underlineLink
        color="black"
        fontBoldLink
        classNameText={s.subText}
      />
      {isLoading && <Spinner />}
    </>
  );
};
