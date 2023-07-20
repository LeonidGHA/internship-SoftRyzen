import { FC } from 'react';

import { Time } from 'constants/types';

import Timer from 'modules/Timer';
import TabsLine from 'modules/TestHeader/TabsLine';

import s from './TestHeader.module.scss';

interface TestHeaderProps {
  quantityQuestions: number;
  currentQuestion: number;
  time: Time;
  handleTimerFinish: () => void;
  setTime: (time: Time) => void;
  isTestFinished: boolean;
}

const TestHeader: FC<TestHeaderProps> = ({
  quantityQuestions,
  currentQuestion,
  time,
  handleTimerFinish,
  setTime,
  isTestFinished,
}) => {
  return (
    <header>
      <div className={s.header}>
        <TabsLine
          quantityQuestions={quantityQuestions}
          currentQuestion={currentQuestion}
        />
        <div className={s.timerWrapper}>
          <p className={s.timerWrapper}>Залишилось:</p>
          <Timer
            onFinish={handleTimerFinish}
            {...time}
            setTime={setTime}
            isTestFinished={isTestFinished}
          />
        </div>
      </div>
    </header>
  );
};

export default TestHeader;
