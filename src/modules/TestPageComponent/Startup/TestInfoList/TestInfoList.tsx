import { FC } from 'react';

import { ICONS } from 'ui-kit/icons';
import s from './TestInfoList.module.scss';
import testStartup from 'data/testStartup.json';
import { DataTestsResponse } from 'constants/types';

interface TestInfoListProps {
  onDropdownClick: () => void;
  data: DataTestsResponse;
}

export const TestInfoList: FC<TestInfoListProps> = ({ onDropdownClick, data }) => {
  const info = [
    {
      title: testStartup.testInfo.deadline.title,
      data: data.availabilityEndDate,
      icon: ICONS.CLOCK_ALARM,
    },
    {
      title: testStartup.testInfo.timeLimit.title,
      data: data.duration,
      icon: ICONS.CLOCK_OUTLINE,
    },
    {
      title: testStartup.testInfo.questions.title,
      data: data.numberOfQuestions,
      icon: ICONS.QUESTION_CIRCLE,
    },
    {
      title: testStartup.testInfo.percentage.title,
      data: data.passingScore,
      icon: ICONS.LIKE,
    },
  ];
  return (
    <ul className={s.testList}>
      {info.map((item, index) => (
        <li key={index} className={s.testListItem}>
          <div className={s.testIconWrapper}>
            <item.icon className={s.testIcon} />
          </div>
          <p className={s.testTitle}>{item.title}</p>
          <div className={s.testDataWrapper}>
            <p className={s.testData}>{item.data}</p>
            {item.title.toLowerCase() === '% відповідей для проходження' ? (
              <button
                type="button"
                className={s.testDropdownButton}
                onClick={onDropdownClick}
              >
                <ICONS.ARROW_DOWN className={s.testButtonIcon} />
              </button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};
