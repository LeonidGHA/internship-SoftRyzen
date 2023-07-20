import { FC, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './Checkbox.module.scss';

export interface ICheckboxProps {
  typeForm: 'SignIn' | 'SignUp';
  labelText: string;
  register?: UseFormRegisterReturn;
  className?: string;
  value?: string | number;
  watchValue?: boolean;
  error?: string;
}

export const Checkbox: FC<ICheckboxProps> = ({
  labelText,
  value,
  watchValue,
  register,
  className,
  error,
  typeForm,
  ...props
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (!watchValue) {
      setChecked(false);
    }
  }, [watchValue]);

  return (
    <label
      className={cn(
        s.checkboxLabel,
        {
          [s.checkboxPositionSignIn]: typeForm === 'SignIn',
        },
        className
      )}
      onChange={handleChange}
    >
      <input
        type="checkbox"
        {...register}
        className={cn('visually-hidden', s.checkbox)}
        value={value}
        {...props}
      />

      <div
        className={cn(s.checkboxWrapper, {
          [s.checkboxPositionSignUp]: typeForm === 'SignUp',
          [s.checkboxWrapperError]: error,
        })}
      >
        {checked && <ICONS.CHECK_MARK width={12} height={9} />}
      </div>

      <span>{labelText}</span>
    </label>
  );
};
