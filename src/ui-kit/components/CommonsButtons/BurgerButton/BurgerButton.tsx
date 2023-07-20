import { ICONS } from 'ui-kit/icons';

interface BurgerButtonProps {
  onClick: () => void;
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  return (
    <button type="button" aria-label="Відкрити бокове меню" onClick={onClick}>
      <ICONS.MENU_HAMBURGER />
    </button>
  );
};
