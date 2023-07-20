import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import s from './Textarea.module.scss';

interface IProps {
  label: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  rows: number;
  className?: string;
  value?: string;
  error?: string | undefined;
}

export const Textarea = ({
  label,
  register,
  placeholder,
  rows,
  className,
  value,
  error,
}: IProps) => {
  return (
    <label className={cn(s.inputContainer, className)}>
      {label}
      <textarea
        className={cn(s.input, { [s.inputError]: error })}
        placeholder={placeholder}
        rows={rows}
        value={value}
        {...register}
      ></textarea>
      {error && <span className={s.msgError}>{error}</span>}
    </label>
  );
};
