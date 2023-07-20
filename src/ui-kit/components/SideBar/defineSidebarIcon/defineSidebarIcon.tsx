import { ICONS } from 'ui-kit/icons';

import s from './defineSidebarIcon.module.scss';

const defineSidebarIcon = (icon: string) => {
  switch (icon) {
    case 'main':
      return <ICONS.SIDE_HOME className={s.icon} />;
    case 'test':
      return <ICONS.SIDE_TEST className={s.iconStroked} />;
    case 'task':
      return <ICONS.SIDE_TASK className={s.icon} />;
    case 'interview':
      return <ICONS.SIDE_INTERVIEW className={s.iconStroked} />;
  }
};

export default defineSidebarIcon;
