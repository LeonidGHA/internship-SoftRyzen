import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import s from './TestAssignmentInput.module.scss';

export interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  error?: string;
  type: string;
  register: UseFormRegisterReturn;
}

const TestAssignmentInput: FC<InputFieldProps> = ({
  label,
  id,
  placeholder,
  error,
  register,
  type,
}) => {
  return (
    <>
      <label className={s.label} htmlFor={id}>
        <span className={s.textLabel}>{label}</span>
        <input
          className={s.inputField}
          id={id}
          type={type}
          placeholder={placeholder}
          aria-label={label}
          {...register}
        />
        {error && <div className={s.textError}>{error}</div>}
      </label>
    </>
  );
};

export default TestAssignmentInput;
