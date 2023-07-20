import { FC, useState, useEffect, FormEvent } from 'react';

import {
  useGetQuestionsQuery,
  useGetTestDataQuery,
} from '../../redux/testing/testingSlice';
import useAppSelector from 'hooks/useAppSelector';
import { Test } from 'constants/types';
import { Time } from 'constants/types';

import TestHeader from 'modules/TestHeader/TestHeader';
import { Testing } from 'modules/Testing';
import { TestResult } from 'modules/TestResult';

import { convertMinutesToTime } from 'utils/timerApi';

interface BlockQuestionsCount {
  CSS?: number;
  HTML?: number;
  JavaScript?: number;
  React?: number;
  Common?: number;
  Design?: number;
}

interface BlockQuestionsAccumulatorCount {
  [key: string]: number;
}

export const TestingPageComponent: FC = () => {
  const userDirection = useAppSelector((state) => state.auth.user.direction);
  const [testNumber, setTestNumber] = useState<number>(1);
  const [currentTest, setCurrentTest] = useState<null | Test>(null);
  const [pointsCount, setPointsCount] = useState<number>(0);
  const [isTestFinished, setTestFinish] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });
  const [blockQuestionCount, setBlockQuestionCount] = useState<BlockQuestionsCount>({});

  const [reactPointsCount, setReactPointsCount] = useState<number>(0);
  const [javaScriptPointsCount, setJavaScriptPointsCount] = useState<number>(0);
  const [cssPointsCount, setCssPointsCount] = useState<number>(0);
  const [htmlPointsCount, setHtmlPointsCount] = useState<number>(0);
  const [commonPointsCount, setCommonPointsCount] = useState<number>(0);
  const [designPointsCount, setDesignPointsCount] = useState<number>(0);

  const { data: tests, isLoading, isError } = useGetQuestionsQuery(userDirection);
  const { data, isLoading: isLoad } = useGetTestDataQuery(userDirection);

  useEffect(() => {
    if (!isLoading && !isError && tests) {
      const question = tests.find((_: Test, index: number) => index === testNumber - 1);

      if (question) {
        setCurrentTest(question);
      }
    }
  }, [testNumber, isLoading, isError, tests]);

  useEffect(() => {
    if (!isLoading && !isError && tests) {
      const questionCountByBlock = tests.reduce(
        (accumulator: BlockQuestionsAccumulatorCount, test: Test) => {
          const block = test.blockQuestions;

          if (accumulator[block]) {
            accumulator[block]++;
          } else {
            accumulator[block] = 1;
          }

          return accumulator;
        },
        {
          CSS: 0,
          HTML: 0,
          JavaScript: 0,
          React: 0,
          Common: 0,
          Design: 0,
        }
      );

      setBlockQuestionCount(questionCountByBlock);
    }
  }, [tests, isLoading, isError]);

  const handleTimerFinish = () => {
    setTestFinish(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>, selectedAnswer: number) => {
    event.preventDefault();

    if (currentTest) {
      if (selectedAnswer + 1 === Number(currentTest.correctAnswerIndex)) {
        setPointsCount((state) => state + currentTest.points);

        switch (currentTest.blockQuestions) {
          case 'CSS':
            setCssPointsCount((state) => state + currentTest.points);
            break;
          case 'HTML':
            setHtmlPointsCount((state) => state + currentTest.points);
            break;
          case 'JavaScript':
            setJavaScriptPointsCount((state) => state + currentTest.points);
            break;
          case 'React':
            setReactPointsCount((state) => state + currentTest.points);
            break;
          case 'Design':
            setDesignPointsCount((state) => state + currentTest.points);
            break;
          case 'Common':
            setCommonPointsCount((state) => state + currentTest.points);
            break;
          default:
            console.log('undefined block question');
        }
      }
    }

    if (tests && testNumber === tests.length) {
      handleTimerFinish();
    } else {
      setTestNumber((state) => state + 1);
    }

    event.currentTarget.reset();
  };

  const blockResults = [
    { title: 'React', points: reactPointsCount, AllQuestion: blockQuestionCount.React },
    {
      title: 'JS',
      points: javaScriptPointsCount,
      AllQuestion: blockQuestionCount.JavaScript,
    },
    { title: 'CSS', points: cssPointsCount, AllQuestion: blockQuestionCount.CSS },
    { title: 'HTML', points: htmlPointsCount, AllQuestion: blockQuestionCount.HTML },
    { title: 'PM', points: commonPointsCount, AllQuestion: blockQuestionCount.Common },
    {
      title: 'Design',
      points: designPointsCount,
      AllQuestion: blockQuestionCount.Design,
    },
  ];

  return !isLoad && currentTest && tests && data ? (
    <>
      <TestHeader
        quantityQuestions={tests.length}
        currentQuestion={testNumber}
        time={convertMinutesToTime(data[0].duration)}
        handleTimerFinish={handleTimerFinish}
        setTime={setTime}
        isTestFinished={isTestFinished}
      />
      <main>
        {!isTestFinished ? (
          <Testing
            test={currentTest}
            onSubmit={handleSubmit}
            testsLength={tests.length}
            testNumber={testNumber}
          />
        ) : (
          <TestResult
            testsLength={tests.length}
            points={pointsCount}
            convertMinutesToTime={convertMinutesToTime}
            duration={data[0].duration}
            time={time}
            blockResults={blockResults}
          />
        )}
      </main>
    </>
  ) : null;
};
