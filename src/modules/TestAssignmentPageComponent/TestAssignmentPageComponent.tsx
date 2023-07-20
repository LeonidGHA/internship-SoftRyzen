import { FC } from 'react';

import { useGetTasksQuery } from '../../redux/testing/testingSlice';
import useAppSelector from 'hooks/useAppSelector';

import CriteriaList from './CriteriaList/CriteriaList';
import TestAssignmentFrom from 'modules/forms/TestAssignmentForm';
import AssignmentDescription from './AssignmentDescription/AssignmentDescription';
import CompleteTest from './CompleteTest/CompleteTest';

import { useCurrentWidth } from 'hooks/useCurrentWidth';
import formatDate from 'utils/formatDateVsTime';

import s from './testAssignmentPageComponent.module.scss';

const TestAssignmentPageComponent: FC = () => {
  const userDirection = useAppSelector((state) => state.auth.user.direction);
  const { data, isLoading } = useGetTasksQuery(userDirection);

  const windowWidth = useCurrentWidth();

  return (
    <>
      {!isLoading && data && (
        <section className={s.testAssignment}>
          <div className={`mainContainer ${s.assignmentContainer}`}>
            <div>
              <div className={s.wrapper}>
                <AssignmentDescription data={data[0]} />
                {windowWidth >= 768 && windowWidth < 1440 && (
                  <CompleteTest formattedDate={formatDate(data[0].deadline)} />
                )}
              </div>
              <div className={s.criterionWrapper}>
                <h3 className={`${s.criterion} ${s.subtitle}`}>Критерії прийому:</h3>
                <CriteriaList data={data} />
              </div>
            </div>
            {/* Form desktop */}
            {windowWidth >= 1440 && (
              <div>
                <h2 className={s.formTitle}>Здати Тестове завдання</h2>
                <TestAssignmentFrom formattedDate={formatDate(data[0].deadline)} />
              </div>
            )}
          </div>
          {/* Form mobile */}
          {windowWidth < 768 && (
            <div className={s.formWrapperMobile}>
              <h2 className={s.formTitle}>Здати Тестове завдання</h2>
              <TestAssignmentFrom formattedDate={formatDate(data[0].deadline)} />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default TestAssignmentPageComponent;
