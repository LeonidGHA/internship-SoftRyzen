import { Fragment } from 'react';

import { StageStep } from 'ui-kit/components/StageStep';

import useAppSelector from 'hooks/useAppSelector';
import { progressStatus } from '../../../redux/progressStatus/progressStatusSelectors';

import { STAGE_STEPS } from 'data/stageSteps';
import s from './StageBar.module.scss';

export type StageType = {
  label: string;
  order: number;
  key: 'task' | 'test' | 'interview' | 'offer';
};

export const StageBar = () => {
  const status = useAppSelector(progressStatus);

  return (
    <div className={s.stageBar}>
      {STAGE_STEPS.map(({ label, order, key }, index) => (
        <Fragment key={order}>
          {index > 0 && <span className={s.line}></span>}
          <StageStep
            isActive={status[key].isActive}
            isSuccess={status[key].isSuccess}
            isFailed={status[key].isFailed}
            order={order}
          >
            {label}
          </StageStep>
        </Fragment>
      ))}
    </div>
  );
};
