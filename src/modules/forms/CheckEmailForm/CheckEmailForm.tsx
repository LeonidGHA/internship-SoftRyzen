import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from 'ui-kit/components/Input';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import { useAxiosConfig } from 'services/axiosConfig';

import useAppDispatch from 'hooks/useAppDispatch';

import notificate from 'utils/notificate';
import { sendNewPassInstruction } from '../../../redux/auth/auth-operations';
import { addEmailForRecover } from '../../../redux/auth/auth-slice';

import forgetPasswordForm from 'data/forgetPasswordForm.json';

import s from './CheckEmailForm.module.scss';

export type CheckEmailInputs = {
  email: string;
};

export const CheckEmailForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<CheckEmailInputs>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();

  const { axiosPublicInstance } = useAxiosConfig();

  const [isEmailOk, setIsEmailOk] = useState<boolean>(false);

  const onInputBlur = async (event: FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    try {
      if (!isValid) {
        return;
      }
      const { data } = await axiosPublicInstance(
        `email/check-email?email=${target.value}`
      );
      if (!data.unique) {
        setIsEmailOk(true);
        return;
      } else {
        notificate('warning', '', forgetPasswordForm.toastMessages.warning);
        setIsEmailOk(false);
        return;
      }
    } catch (error: any) {
      setIsEmailOk(false);
      notificate('error', '', error.message);
      return;
    }
  };

  const sendInstr = (formData: CheckEmailInputs) => {
    dispatch(sendNewPassInstruction(formData));
    dispatch(addEmailForRecover(formData));
  };
  return (
    <form className={s.form} onSubmit={handleSubmit(sendInstr)}>
      <Input
        className={s.input}
        type="email"
        label={forgetPasswordForm.form.input.label}
        placeholder={forgetPasswordForm.form.input.placeholder}
        register={register('email', {
          required: true,
          onBlur: onInputBlur,
          validate: {
            testValue: (value: string) => {
              const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
              return emailRegexp.test(value) || forgetPasswordForm.form.input.errorText;
            },
          },
        })}
        error={errors.email?.message}
      />
      <Button
        type="submit"
        text={forgetPasswordForm.form.button.text}
        authSubmitVariant
        centered
        isDisabled={!isEmailOk}
      />
    </form>
  );
};
