import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './RadioInput.module.scss';

export interface IRadioInputProps {
  labelText: string;
  value: string;
  labelGap?: '20px' | '24px';
  fontSize?: '16px' | '18px';
  isRegularFont?: boolean;
  classNameLabel?: string;
  watchValue?: string | object | undefined;
  shapeRadio?: 'circle' | 'square';
  register?: UseFormRegisterReturn;
  error?: string;
}

export const RadioInput: FC<IRadioInputProps> = ({
  labelText,
  register,
  value = '',
  shapeRadio = 'square',
  labelGap = '20px',
  isRegularFont,
  classNameLabel,
  watchValue,
  fontSize = '16px',
  error,
}) => {
  const finalRadioLabelClassName = cn(
    s.radioLabel,
    {
      [s.radioLabelSmallGap]: labelGap === '20px',
      [s.radioLabelLargeGap]: labelGap === '24px',
      [s.radioLabelFontWeight]: isRegularFont,
      [s.radioLabelFontSizeSmall]: fontSize === '16px',
      [s.radioLabelFontSizeLarge]: fontSize === '18px',
    },
    classNameLabel
  );
  return (
    <label className={finalRadioLabelClassName}>
      <input type="radio" {...register} value={value} className="visually-hidden" />

      {shapeRadio === 'circle' && (
        <div className={s.radioCircleWrapper}>
          {value === watchValue ? (
            <ICONS.RADIO_CHECKED width={24} height={24} />
          ) : (
            <ICONS.RADIO_DISABLED width={24} height={24} />
          )}
        </div>
      )}

      {shapeRadio === 'square' && (
        <div
          className={cn(s.radioSquareWrapper, {
            [s.radioSquareWrapperError]: error,
          })}
        >
          {value === watchValue && <ICONS.CHECK_MARK width={12} height={9} />}
        </div>
      )}

      {labelText}
    </label>
  );
};
