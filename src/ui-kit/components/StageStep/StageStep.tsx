import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './StageStep.module.scss';

type StepType = {
  isActive: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  order: number;
  children: ReactNode;
};

export const StageStep: FC<StepType> = ({
  isActive,
  isSuccess,
  isFailed,
  order,
  children,
}) => {
  return (
    <div className={s.stepContainer}>
      <div
        className={cn(s.step, {
          [s.active]: isActive,
          [s.success]: isSuccess,
          [s.failure]: isFailed,
        })}
      >
        {isSuccess && <ICONS.CHECK_SMALL className={s.svg} />}
        {isFailed && <ICONS.CROSS_SMALL className={s.svg} />}
        {!isSuccess && !isFailed && <span>{order}</span>}
      </div>
      <span className={s.description}>{children}</span>
    </div>
  );
};
