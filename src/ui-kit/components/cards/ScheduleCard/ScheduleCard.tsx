import { FC } from 'react';
import cn from 'classnames';

import { formatStartDate } from 'utils/formatStartDate';

import s from './ScheduleCard.module.scss';

interface ScheduleCardProps {
  item: {
    label: string;
    start: string;
    duration: string;
    color: string;
  };
  startDate: string | 0 | Date | null;
  description: string | 0 | null;
}

export const ScheduleCard: FC<ScheduleCardProps> = ({ item, startDate, description }) => {
  const { label, start, duration, color } = item;

  return (
    <li className={s.container}>
      <span className={s.start}>{startDate ? formatStartDate(startDate) : start}</span>

      <div
        className={cn(s.block, {
          [s.blue]: color == 'blue',
          [s.green]: color === 'green',
          [s.red]: color === 'red',
        })}
      >
        <span className={s.duration}>{description ? description : duration}</span>

        <span>{label}</span>
      </div>
    </li>
  );
};
