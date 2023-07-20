import { interviewDurationDays } from 'constants/stagesDuration';
import { transformDaysToMs } from './transformDaysToMs';
import { getStagesDurationDescription } from './getStagesDurationDescription';

interface ITestData {
  startDate: Date | string | null;
  endDate: Date | string | null;
  isSent: boolean;
  isSuccess: boolean;
}

interface ITaskData {
  deadlineDate: Date | null;
  isSent: boolean;
  isSuccess: boolean;
}

export const getDatesForCalendar = (testData: ITestData, taskData: ITaskData) => {
  const testStartDate = testData.startDate && new Date(testData.startDate).getTime();
  const testEndDate = testData.endDate && new Date(testData.endDate).getTime();
  const testDesc =
    testStartDate &&
    testEndDate &&
    getStagesDurationDescription(testStartDate, testEndDate);

  const taskStartDate = testEndDate && testEndDate + transformDaysToMs(1);
  const taskEndDate = taskData.deadlineDate && new Date(taskData.deadlineDate).getTime();
  const taskDesc =
    taskStartDate &&
    taskEndDate &&
    getStagesDurationDescription(taskStartDate, taskEndDate);

  const interviewStartDate = taskEndDate && taskEndDate + transformDaysToMs(1);
  const interviewEndDate =
    interviewStartDate && interviewStartDate + transformDaysToMs(interviewDurationDays);
  const interviewDesc =
    interviewStartDate &&
    interviewEndDate &&
    getStagesDurationDescription(interviewStartDate, interviewEndDate);

  return {
    test: {
      startDate: testData.startDate,
      endDate: testData.endDate,
      description: testDesc,
    },
    task: {
      startDate: taskStartDate && new Date(taskStartDate).toISOString(),
      endDate: taskData.deadlineDate,
      description: taskDesc,
    },
    interview: {
      startDate: interviewStartDate && new Date(interviewStartDate).toISOString(),
      endDate: interviewEndDate && new Date(interviewEndDate).toISOString(),
      description: interviewDesc,
    },
  };
};
