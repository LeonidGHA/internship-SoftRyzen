import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './TextBtnNavLink.module.scss';

export interface ITextBtnNavLinkProps {
  path: string;
  textLink: string;
  textBeforeLink?: string;
  arrow?: boolean;
  textSize?: '12' | '14';
  fontWeightText?: '300' | '600';
  fontWeightLink?: '400' | '600';
  color?: 'blue' | 'black';
  underlineLink?: boolean;
  classNameText?: string;
  classNameLink?: string;
}

export const TextBtnNavLink: FC<ITextBtnNavLinkProps> = ({
  textBeforeLink,
  path,
  textLink,
  textSize,
  fontWeightText,
  fontWeightLink,
  arrow = false,
  color,
  underlineLink = false,
  classNameText,
  classNameLink,
}) => {
  return (
    <Link
      to={path}
      className={cn(
        s.text,
        {
          [s.textColorBlue]: color === 'blue',
          [s.textColorBlack]: color === 'black',
          [s.textSizeXS]: textSize === '12',
          [s.textSizeSM]: textSize === '14',
          [s.textFontRegular]: fontWeightText === '300',
          [s.textFontSemiBold]: fontWeightText === '600',
        },
        classNameText
      )}
    >
      {arrow && <ICONS.ARROW_LEFT_SHORT width={11} height={9} className={s.arrowSvg} />}
      {textBeforeLink}{' '}
      <span
        className={cn(
          {
            [s.textLinkFontRegular]: fontWeightLink === '400',
            [s.textLinkFontSemiBold]: fontWeightLink === '600',
            [s.textLinkUnderline]: underlineLink,
          },
          classNameLink
        )}
      >
        {textLink}
      </span>
    </Link>
  );
};
