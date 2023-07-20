import cn from 'classnames';

import { Logo } from 'ui-kit/components/Logo';
import { UserButton } from 'ui-kit/components/UserButton/UserButton';
import { BurgerButton } from 'ui-kit/components/CommonsButtons/BurgerButton';
import { DirectionStatus } from 'ui-kit/components/DirectionStatus';
import { StageBar } from 'ui-kit/components/StageBar';

import { useCurrentWidth } from 'hooks/useCurrentWidth';

import s from './MainHeader.module.scss';

interface MainHeaderProps {
  onClick: () => void;
  isLogoShort: boolean;
}

export const MainHeader = ({ onClick, isLogoShort }: MainHeaderProps) => {
  const width = useCurrentWidth();

  return (
    <header className={s.section}>
      <div className={cn('headerContainer', s.container)}>
        {width >= 1440 && (
          <>
            <Logo isShort={isLogoShort} />
            <StageBar />
          </>
        )}
        {width < 1440 && <BurgerButton onClick={onClick} />}
        <div className={s.userBar}>
          <DirectionStatus />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
