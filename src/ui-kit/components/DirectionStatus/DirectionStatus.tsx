import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import { useCurrentWidth } from 'hooks/useCurrentWidth';
import useAppSelector from 'hooks/useAppSelector';
import { userData } from '../../../redux/auth/auth-selectors';

import s from './DirectionStatus.module.scss';

export const DirectionStatus = () => {
  const user = useAppSelector(userData);
  const width = useCurrentWidth();

  let Icon;

  switch (user?.direction?.toLocaleLowerCase()) {
    case 'frontend':
      Icon = ICONS.CODING_GREEN;
      break;
    case 'backend':
      Icon = ICONS.BACKEND_GREEN;
      break;
    case 'designer':
      Icon = ICONS.WEB_DESIGN_GREEN;
      break;
    case 'qa':
      Icon = ICONS.DEBUGGING_GREEN;
      break;
    case 'pm':
      Icon = ICONS.MANAGEMENT_GREEN;
      break;

    default:
      Icon = ICONS.CODING_GREY;
      break;
  }

  return (
    <div className={cn(s.container, { [s.active]: user?.direction })}>
      {width < 768 && <Icon width={20} height={20} />}
      {width >= 768 &&
        (user?.direction ? (
          <span className={s.text}>{user?.direction}</span>
        ) : (
          <span>Напрям</span>
        ))}
    </div>
  );
};
