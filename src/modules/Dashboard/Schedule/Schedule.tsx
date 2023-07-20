import { ScheduleCard } from 'ui-kit/components/cards/ScheduleCard';

import useAppSelector from 'hooks/useAppSelector';
import { getTaskData, getTestData } from '../../../redux/auth/auth-selectors';
import { getDatesForCalendar } from 'utils/getDatesForCalendar';
import scheduleCards from 'data/scheduleCards.json';

import s from './Schedule.module.scss';

interface stageDates {
  startDate: Date | string | 0 | null;
  endDate: Date | string | 0 | null;
  description: string | 0 | null;
}

interface DatesType {
  [key: string]: stageDates;
}

export const Schedule = () => {
  const testData = useAppSelector(getTestData);
  const taskData = useAppSelector(getTaskData);

  const dates: DatesType = getDatesForCalendar(testData, taskData);

  return (
    <ul className={s.schedule}>
      {scheduleCards.map((el) => {
        return (
          <ScheduleCard
            key={el.label}
            item={el}
            startDate={dates[el.key].startDate}
            description={dates && dates[el.key].description}
          />
        );
      })}
    </ul>
  );
};
