import { FC } from 'react';
import cn from 'classnames';

import s from './DropdownList.module.scss';

type DropdownItemProps = {
  label: string;
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>> | null;
  className?: string;
  onClick?: () => void;
};
interface DropdownListProps {
  options: DropdownItemProps[];
}

export const DropdownList: FC<DropdownListProps> = ({ options }) => {
  return (
    <ul className={s.optionList}>
      {options?.length > 0 &&
        options.map(({ label, Icon, className, onClick }, index) => (
          <li key={index} className={cn(s.item, className)} onClick={onClick}>
            {Icon && <Icon />}
            <span>{label}</span>
          </li>
        ))}
    </ul>
  );
};
