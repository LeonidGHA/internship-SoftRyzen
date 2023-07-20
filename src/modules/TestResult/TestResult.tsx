import { FC } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from 'hooks/useAppDispatch';

import { ICONS } from 'ui-kit/icons';
import { ROUTES } from 'routes/routes.const';
import { Time, Block } from 'constants/types';
import { incrementPage } from '../../redux/testing/testingPageSlice';

import { Title } from 'ui-kit/components/typography/Title';
import { Button } from 'ui-kit/components/CommonsButtons/Button';
import { ProgressList } from 'ui-kit/components/ProgressList';

import { countTime } from 'utils/timerApi';

import testResult from 'data/testResult.json';
import s from './TestResult.module.scss';

interface TestResultProps {
  testsLength: number;
  points: number;
  duration: number;
  time: Time;
  convertMinutesToTime: (d: number) => Time;
  blockResults: Block[];
}

export const TestResult: FC<TestResultProps> = ({
  testsLength,
  points,
  duration,
  time,
  convertMinutesToTime,
  blockResults,
}) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    console.log('Send data');
    dispatch(incrementPage());
    navigate(ROUTES.TEST, {
      state: {
        testsLength,
        points,
        blockResults,
      },
    });
  };

  const timeSpent = countTime(convertMinutesToTime(duration), time);

  const pointsToPass = 15;

  return (
    <section className={s.testResult}>
      <div className="mainContainer">
        <div className={s.resultWrapper}>
          <Title Tag="h1">{testResult.title}</Title>

          <div className={cn(s.resultInfoWrapper, s.correctAnswers)}>
            <p className={s.resultInfoTitle}>{testResult.correctAnswersText}</p>
            <p className={s.resultInfoCount}>{`${points}/${testsLength}`}</p>
          </div>

          <div className={s.progressListWrapper}>
            <ProgressList progressData={blockResults} />
          </div>

          <div className={s.resultInfoWrapper}>
            <p className={s.resultInfoTitle}>{testResult.timeSpentText}</p>
            <p
              className={s.resultInfoCount}
            >{`${timeSpent.hours}hr. ${timeSpent.minutes}min. ${timeSpent.seconds}sec.`}</p>
          </div>

          {points < pointsToPass ? (
            <div className={cn(s.testPassBox, s.failed)}>
              <ICONS.LIKE className={cn(s.testPassIcon, s.iconFailed)} />
              <p className={cn(s.testPassText, s.textFailed)}>
                {testResult.resultText.negative}
              </p>
            </div>
          ) : (
            <div className={cn(s.testPassBox, s.passed)}>
              <ICONS.LIKE className={s.testPassIcon} />
              <p className={s.testPassText}>{testResult.resultText.positive}</p>
            </div>
          )}

          <Button
            text={testResult.buttonLinkText}
            centered
            longestVariant
            moreStyles={s.finishButton}
            onClick={handleClick}
          />
        </div>
      </div>
    </section>
  );
};
