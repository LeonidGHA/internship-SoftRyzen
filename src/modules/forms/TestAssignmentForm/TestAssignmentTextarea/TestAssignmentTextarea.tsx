import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import s from './TestAssignmentTextarea.module.scss';

export interface TextareaFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

const TestAssignmentTextarea: FC<TextareaFieldProps> = ({
  label,
  id,
  placeholder,
  error,
  register,
}) => {
  return (
    <>
      <label className={s.label} htmlFor={id}>
        <span className={s.textLabel}>{label}</span>
        <textarea
          className={s.textareaField}
          id={id}
          placeholder={placeholder}
          aria-label={label}
          {...register}
        />
        {error && <div className={s.textError}>{error}</div>}
      </label>
    </>
  );
};

export default TestAssignmentTextarea;
