import { FC, FormEvent } from 'react';

import { Test } from 'constants/types';

import { TestingForm } from 'modules/forms/TestingForm/TestingForm';

import s from './Testing.module.scss';

interface TestingProps {
  test: Test;
  onSubmit: (event: FormEvent<HTMLFormElement>, selectedAnswer: number) => void;
  testsLength: number;
  testNumber: number;
}

export const Testing: FC<TestingProps> = (props) => {
  return (
    <section className={s.testingSection}>
      <div className={s.testingContainer}>
        <TestingForm {...props} />
      </div>
    </section>
  );
};
