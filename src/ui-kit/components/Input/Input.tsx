import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './Input.module.scss';

interface IProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'url';
  register: UseFormRegisterReturn;
  placeholder: string;
  className?: string;
  value?: string;
  button?: boolean;
  error?: string | undefined;
}

export const Input = ({
  label,
  type,
  register,
  placeholder,
  className,
  value,
  button,
  error,
}: IProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    inputType === 'text' ? setInputType('password') : setInputType('text');
  };

  return (
    <label className={cn(s.inputContainer, className)}>
      {label}
      <input
        className={cn(s.input, { [s.inputError]: error })}
        placeholder={placeholder}
        type={inputType}
        value={value}
        {...register}
      />
      {button && (
        <button
          className={s.iconBtn}
          type="button"
          onClick={togglePassword}
          area-aria-label={
            inputType === 'password' ? 'Показати пароль' : 'Приховати пароль'
          }
        >
          {inputType === 'password' ? <ICONS.EYE_CLOSED /> : <ICONS.EYE_OPEN />}
        </button>
      )}
      {error && <span className={s.msgError}>{error}</span>}
    </label>
  );
};
