import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import s from './TextNavLink.module.scss';

export interface ITextNavLinkProps {
  path: string;
  textLink: string;
  textBeforeLink?: string;
  fontBoldLink?: boolean;
  color?: 'blue' | 'black';
  underlineLink?: boolean;
  classNameText?: string;
  classNameLink?: string;
}

export const TextNavLink: FC<ITextNavLinkProps> = ({
  textBeforeLink,
  path,
  textLink,
  fontBoldLink,
  color,
  underlineLink = false,
  classNameText,
  classNameLink,
}) => {
  return (
    <p
      className={cn(
        s.text,
        {
          [s.textColorBlue]: color === 'blue',
          [s.textColorBlack]: color === 'black',
        },
        classNameText
      )}
    >
      {textBeforeLink}{' '}
      <Link
        to={path}
        className={cn(
          {
            [s.textLinkFontSemiBold]: fontBoldLink,
            [s.textLinkUnderline]: underlineLink,
          },
          classNameLink
        )}
      >
        {textLink}
      </Link>
    </p>
  );
};
