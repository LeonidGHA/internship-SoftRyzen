import { FC } from 'react';
import cn from 'classnames';

import { Block } from 'constants/types';

import s from './ProgressList.module.scss';
import { useGetTestDataQuery } from '../../../redux/testing/testingSlice';
import useAppSelector from 'hooks/useAppSelector';

interface ProgressListProps {
  progressData: Block[];
  isStartup?: boolean;
}

export const ProgressList: FC<ProgressListProps> = ({ progressData, isStartup }) => {
  const userDirection = useAppSelector((state) => state.auth.user.direction);
  const { data } = useGetTestDataQuery(userDirection);

  return (
    data && (
      <ul className={s.progressList}>
        {progressData.map((item, index) => {
          if (item.AllQuestion === 0) return null;
          return (
            item.AllQuestion && (
              <li key={index} className={s.progressItem}>
                <p>{item.title}</p>
                <p>{`${item.points}/${item.AllQuestion}`}</p>
                <span
                  className={cn(
                    s.progressBar,
                    item.points < (data[0].passingScore / 100) * item.AllQuestion
                      ? s.failed
                      : s.passed,
                    isStartup && s.startup
                  )}
                  style={{
                    width: `calc(100%/(${item.AllQuestion / item.points}))`,
                  }}
                ></span>
              </li>
            )
          );
        })}
      </ul>
    )
  );
};
