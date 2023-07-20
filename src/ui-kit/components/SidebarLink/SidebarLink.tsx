import { NavLink } from 'react-router-dom';

import cn from 'classnames';

import defineSidebarIcon from '../SideBar/defineSidebarIcon/defineSidebarIcon';

import s from './SidebarLink.module.scss';

interface SidebarLinkProps {
  iconName: string;
  label: string;
  linkAddress: string;
  isClickable: boolean;
  isHiddenVariant: boolean;
  onClick: () => void;
}

export const SidebarLink = ({
  iconName,
  label,
  linkAddress,
  isClickable,
  isHiddenVariant,
  onClick,
}: SidebarLinkProps) => {
  const iconUsed = defineSidebarIcon(iconName);

  const chooseNavLinkClassName = (isNavLinkActive: boolean) =>
    cn(
      !isHiddenVariant ? s.item : s.itemHidden,
      !isClickable && s.itemInactive,
      isClickable && !isNavLinkActive && s.itemActive,
      isClickable && isNavLinkActive && s.itemClicked
    );

  return (
    <li className={cn(isClickable ? s.clickable : s.unClickable)} onClick={onClick}>
      <NavLink
        className={({ isActive }) => chooseNavLinkClassName(isActive)}
        to={linkAddress}
      >
        {iconUsed}
        {!isHiddenVariant && (
          <span className={cn(!isClickable ? s.label : s.labelClickable)}>{label}</span>
        )}
      </NavLink>
    </li>
  );
};
