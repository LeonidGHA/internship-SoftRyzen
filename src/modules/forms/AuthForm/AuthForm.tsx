import { FC } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { ROUTES } from 'routes/routes.const';
import notificate from 'utils/notificate';
import { useAxiosConfig } from 'services/axiosConfig';
import useAppDispatch from 'hooks/useAppDispatch';
import { logInAuth, registerAuth } from '../../../redux/auth/auth-operations';

import { Title } from 'ui-kit/components/typography/Title';
import { GoogleButton } from 'ui-kit/components/CommonsButtons/GoogleButton';
import { TextNavLink } from 'ui-kit/components/CommonsButtons/TextNavLink';
import { TextBtnNavLink } from 'ui-kit/components/CommonsButtons/TextBtnNavLink';
import { Input } from 'ui-kit/components/Input';
import { Checkbox } from 'ui-kit/components/Checkbox';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import s from './AuthForm.module.scss';

import { IDataProps, INotificationAuthMessages } from './AuthForm.props';

export interface IFormAuthProps {
  typeAuth: 'Registration' | 'LogIn';
  data: IDataProps;
  notification: INotificationAuthMessages;
}

interface IFormInputsType {
  email: string;
  password: string;
  check: boolean;
  checkEmail: string;
}

export const AuthForm: FC<IFormAuthProps> = ({ typeAuth, data, notification }) => {
  const { axiosPublicInstance } = useAxiosConfig();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<IFormInputsType>({});

  const watchValue = watch('check') as unknown as boolean;

  const onSubmitLogIn = async (data: IFormInputsType) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };
    const request = await dispatch(logInAuth(requestData));
    const requestStatus = request.meta.requestStatus;

    if (requestStatus === 'fulfilled') {
      reset();
    }
  };

  const onSubmitRegisration = async (data: IFormInputsType) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };
    const request = await dispatch(registerAuth(requestData));
    const requestStatus = request.meta.requestStatus;

    if (requestStatus === 'fulfilled') {
      reset();
      notificate(
        'success',
        notification.registration.success.title,
        notification.registration.success.message
      );
    }
  };

  const onBlurCheckEmail = async () => {
    if (!errors.email && getValues().email !== '') {
      const { data }: { data: { unique: boolean } } = await axiosPublicInstance.get(
        'email/check-email',
        {
          params: { email: getValues().email },
        }
      );
      if (data.unique) {
        typeAuth === 'LogIn'
          ? (setError('checkEmail', {
              type: 'checkEmail',
              message: notification.email.checkEmailLoginMessage,
            }),
            notificate('error', '', notification.email.checkEmailLoginMessage))
          : clearErrors('checkEmail');
        return;
      }

      typeAuth === 'LogIn'
        ? clearErrors('checkEmail')
        : (setError('checkEmail', {
            type: 'checkEmail',
            message: notification.email.checkEmailRegistrationMessage,
          }),
          notificate('error', '', notification.email.checkEmailRegistrationMessage));
    }
  };

  return (
    <>
      <Title Tag="h1">{data.title}</Title>
      <form
        onSubmit={handleSubmit(
          typeAuth === 'LogIn' ? onSubmitLogIn : onSubmitRegisration
        )}
        className={s.form}
      >
        <TextNavLink
          path={typeAuth === 'LogIn' ? ROUTES.REGISTER : ROUTES.LOGIN}
          textBeforeLink={data.navLink.textBeforeLink}
          textLink={data.navLink.textLink}
          color="black"
          underlineLink
          classNameText={s.textNavLink}
        />

        <GoogleButton className={s.googleButton} />

        <span className={s.separation}>{data.separationText}</span>

        <Input
          label={data.inputEmailText.label}
          register={register('email', {
            required: "Це поле обов'язкове",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: notification.email.patternMessage,
            },
            minLength: {
              value: 6,
              message: notification.email.minLengthMessage,
            },
            maxLength: {
              value: 63,
              message: notification.email.maxLengthMessage,
            },
            onChange: () => {
              trigger('email');
            },
            onBlur: () => onBlurCheckEmail(),
          })}
          error={errors.email?.message || errors.checkEmail?.message}
          placeholder={data.inputEmailText.placeholder}
          type="text"
          className={cn(s.inputEmail, {
            [s.inputLabelColor]: watch('email'),
          })}
        />

        <Input
          label={data.inputPasswordText.label}
          register={register('password', {
            required: "Це поле обов'язкове",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).{6,32}$/,
              message: notification.password.patternMessage,
            },
            minLength: {
              value: 6,
              message: notification.password.minLengthMessage,
            },
            maxLength: {
              value: 32,
              message: notification.password.maxLengthMessage,
            },
          })}
          error={errors.password?.message}
          placeholder={data.inputPasswordText.placeholder}
          type="password"
          button
          className={cn(s.inputPassword, {
            [s.inputLabelColor]: watch('password'),
          })}
        />

        {typeAuth === 'LogIn' ? (
          <div className={s.logInCheckboxWrapper}>
            <Checkbox
              register={register('check')}
              labelText={data.checkboxText}
              typeForm="SignIn"
              watchValue={watchValue}
            />

            <TextBtnNavLink
              path={ROUTES.FORGOT_PASS}
              textLink={data.textBtnLinkText || ''}
              color="blue"
              textSize="14"
              fontWeightLink="400"
            />
          </div>
        ) : (
          <Checkbox
            register={register('check', { required: 'required' })}
            labelText={data.checkboxText}
            typeForm="SignUp"
            watchValue={watchValue}
            error={errors.check?.message}
            className={s.checkbox}
          />
        )}

        <Button
          text={data.buttonSubmitText}
          type="submit"
          icon
          centered
          authSubmitVariant
          moreStyles={s.buttonSubmit}
          isDisabled={
            typeAuth === 'LogIn'
              ? getValues().email === '' || getValues().password === '' || !isDirty
              : getValues().email === '' ||
                getValues().password === '' ||
                !getValues().check ||
                !isDirty
          }
        />
      </form>
    </>
  );
};
