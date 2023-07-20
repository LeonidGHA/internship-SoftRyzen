import { FC } from 'react';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './GoogleButton.module.scss';

export interface IGoogleButtonProps {
  className?: string;
}

export const GoogleButton: FC<IGoogleButtonProps> = ({ className }) => {
  return (
    <a
      type="button"
      className={cn(s.button, className)}
      rel="noopener noreferrer nofollow"
      target="_blank"
      href={import.meta.env.VITE_GOOGLE_AUTH_URL}
    >
      Увійти через
      <ICONS.GOOGLE width={24} height={24} />
      Google
    </a>
  );
};
