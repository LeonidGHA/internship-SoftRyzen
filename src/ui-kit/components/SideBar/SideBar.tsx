import { useState, useEffect } from 'react';
import cn from 'classnames';

import { SidebarLinks } from './SidebarLinks';

import { useCurrentWidth } from 'hooks/useCurrentWidth';

import { ICONS } from 'ui-kit/icons';

import sidebarLinks from 'data/sidebarLinks.json';
import sidebarLocalStorageKey from 'constants/sidebarLocalStorageKey.json';

import s from './SideBar.module.scss';

interface SidebarProps {
  isShown: boolean;
  onClick: () => void;
  onTogglerClick: (state: boolean) => void;
}

export const Sidebar = ({ isShown, onClick, onTogglerClick }: SidebarProps) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  const innerWidth = useCurrentWidth();
  const isDesktopWidth = innerWidth >= 1440;

  useEffect(() => {
    const LSHasSidebarState = localStorage.getItem(sidebarLocalStorageKey.key);
    if (LSHasSidebarState) {
      const serializedSidebarState = LSHasSidebarState === 'true' ? true : false;
      setIsSidebarHidden(serializedSidebarState);
    }
  }, []);

  const toggleSidebar = (): void => {
    setIsSidebarHidden((prevState) => !prevState);
    localStorage.setItem(sidebarLocalStorageKey.key, String(!isSidebarHidden));
    onTogglerClick(isSidebarHidden);
  };

  return (
    <aside
      className={cn(
        !isSidebarHidden ? s.wrapper : s.wrapperHidden,
        !isShown && s.noneWrapper
      )}
    >
      <div className={s.linkSide}>
        <SidebarLinks
          onClick={onClick}
          links={sidebarLinks.links}
          isHiddenVariant={!isDesktopWidth ? false : isSidebarHidden}
        />
        <ICONS.SEND_SQUARE
          className={cn(isSidebarHidden ? s.togglerToLeft : s.togglerToRight)}
          onClick={toggleSidebar}
        />
      </div>
    </aside>
  );
};
