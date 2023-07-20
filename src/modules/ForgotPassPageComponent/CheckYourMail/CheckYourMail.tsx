import { Title } from 'ui-kit/components/typography/Title';
import { TextBtnNavLink } from 'ui-kit/components/CommonsButtons/TextBtnNavLink';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { getEmailForRecover } from '../../../redux/auth/auth-selectors';
import { sendEmailForRecover } from '../../../redux/auth/auth-operations';

import checkYourMail from 'data/checkYourMail.json';
import { ROUTES } from 'routes/routes.const';

import s from './CheckYourMail.module.scss';

export type EmailForRecoverType = {
  email: string;
};

export const CheckYourMail = () => {
  const emailForRecover = useAppSelector(getEmailForRecover);
  const dispatch = useAppDispatch();

  const sendEmailForRecoverAgain = () =>
    dispatch(sendEmailForRecover({ email: emailForRecover }));
  return (
    <>
      <Title Tag="h1" className={s.title}>
        {checkYourMail.title}
      </Title>
      <p className={s.info}>
        {checkYourMail.info}
        <br />
        <span>{emailForRecover}</span>
      </p>
      <p className={s.subText}>
        {checkYourMail.subText.textBeforeLink}{' '}
        <span className={s.subTextLink} onClick={sendEmailForRecoverAgain}>
          {checkYourMail.subText.linkText}
        </span>
      </p>
      <TextBtnNavLink
        textBeforeLink={checkYourMail.bottomLink.textBeforeLink}
        textLink={checkYourMail.bottomLink.linkText}
        path={ROUTES.LOGIN}
        arrow
        textSize="12"
        fontWeightText="600"
        fontWeightLink="600"
        color="blue"
        underlineLink
        classNameText={s.bottomLink}
      />
    </>
  );
};
