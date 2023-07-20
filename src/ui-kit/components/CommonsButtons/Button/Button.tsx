import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';
import s from './Button.module.scss';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  icon?: boolean;
  centered?: boolean;
  lightVariant?: boolean;
  authSubmitVariant?: boolean;
  mainPageSubmitVariant?: boolean;
  shortVariant?: boolean;
  longestVariant?: boolean;
  smallTextVariant?: boolean;
  isDisabled?: boolean;
  link?: string;
  externalLink?: string;
  moreStyles?: string;
}

export const Button = ({
  text,
  type,
  onClick,
  icon,
  centered,
  lightVariant,
  authSubmitVariant,
  mainPageSubmitVariant,
  shortVariant,
  longestVariant,
  smallTextVariant,
  isDisabled,
  link,
  externalLink,
  moreStyles,
}: ButtonProps) => {
  const finalClassName = cn(
    s.btn,
    centered && s.btnCentered,
    authSubmitVariant && s.btnWidth240,
    mainPageSubmitVariant && s.btnWidth259,
    longestVariant && s.btnLongest,
    shortVariant && s.btnShort,
    lightVariant && s.btnLight,
    smallTextVariant && s.btnSmallText,
    link && isDisabled && s.linkDisabled,
    moreStyles
  );

  return (
    <>
      {link && (
        <Link to={link} className={finalClassName}>
          <span className={s.text}>{text}</span>
          {icon && <ICONS.ARROW_INSERT />}
        </Link>
      )}

      {externalLink && (
        <a
          href={externalLink}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className={finalClassName}
        >
          <span className={s.text}>{text}</span>
          {icon && <ICONS.ARROW_INSERT />}
        </a>
      )}

      {!link && !externalLink && (
        <button
          type={type}
          onClick={onClick}
          className={finalClassName}
          disabled={isDisabled}
        >
          <span className={s.text}>{text}</span>
          {icon && <ICONS.ARROW_INSERT />}
        </button>
      )}
    </>
  );
};
