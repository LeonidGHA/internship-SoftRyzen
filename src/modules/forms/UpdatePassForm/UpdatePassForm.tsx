import { useForm } from 'react-hook-form';

import { Input } from 'ui-kit/components/Input';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import useAppDispatch from 'hooks/useAppDispatch';
import useUserData from 'hooks/useUserData';

import { sendChangedPass } from '../../../redux/auth/auth-operations';

import newPasswordForm from 'data/newPasswordForm.json';

import s from './UpdatePassForm.module.scss';

export type UpdatePassFormInputs = {
  password: string;
  confirmPassword: string;
};

export type FullUpdatePassFormData = {
  inputs: UpdatePassFormInputs;
  accessToken: string;
};

export const UpdatePassForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<UpdatePassFormInputs>({ mode: 'onBlur' });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const dispatch = useAppDispatch();

  const { accessToken } = useUserData();

  const sendNewPass = (formData: UpdatePassFormInputs) => {
    const fullFormData = { inputs: formData, accessToken };
    dispatch(sendChangedPass(fullFormData));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(sendNewPass)}>
      <Input
        label={newPasswordForm.form.firstInput.label}
        type="password"
        placeholder={newPasswordForm.form.firstInput.placeholder}
        button
        register={register('password', {
          required: true,
          validate: {
            testValue: (value: string) => {
              const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d).{6,32}$/;
              return (
                passwordRegexp.test(value) || newPasswordForm.form.firstInput.errorText
              );
            },
            isEqual: (value: string) => {
              if (value === confirmPasswordValue) {
                clearErrors('confirmPassword');
                return true;
              }
              return;
            },
          },
        })}
        error={errors.password?.message}
      />
      <Input
        className={s.lastInput}
        label={newPasswordForm.form.secondInput.label}
        type="password"
        placeholder={newPasswordForm.form.secondInput.placeholder}
        button
        register={register('confirmPassword', {
          required: true,
          validate: {
            isEqual: (value: string) => {
              return (
                value === passwordValue || newPasswordForm.form.secondInput.errorText
              );
            },
          },
        })}
        error={errors.confirmPassword?.message}
      />
      <Button
        text={newPasswordForm.form.button.text}
        type="submit"
        centered
        authSubmitVariant
        isDisabled={!isValid}
      />
    </form>
  );
};
