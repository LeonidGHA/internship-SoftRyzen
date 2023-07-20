import { FC } from 'react';

import { ICONS } from 'ui-kit/icons';

import s from './Spinner.module.scss';

export const Spinner: FC = () => {
  return (
    <div className={s.spinner}>
      <ICONS.SPINNER className={s.rotation} />
    </div>
  );
};
