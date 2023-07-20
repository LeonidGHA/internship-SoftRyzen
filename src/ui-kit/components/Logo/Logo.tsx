import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ROUTES } from 'routes/routes.const';
import { ICONS } from 'ui-kit/icons';

import s from './Logo.module.scss';

interface LogoProps {
  isShort?: boolean;
  className?: string;
}

export const Logo: FC<LogoProps> = ({ isShort, className }) => {
  return (
    <>
      <Link to={ROUTES.HOME} className={s.logoLink}>
        {isShort ? (
          <ICONS.LOGO_SHORT className={cn(s.logoIconShort, className)} />
        ) : (
          <ICONS.LOGO className={cn(s.logoIcon, className)} />
        )}
      </Link>
    </>
  );
};
