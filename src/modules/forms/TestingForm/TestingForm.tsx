import { FC, useState, FormEvent, ChangeEvent } from 'react';
import cn from 'classnames';

import { Test } from 'constants/types';

import s from './TestingForm.module.scss';

interface TestingFormProps {
  test: Test;
  onSubmit: (event: FormEvent<HTMLFormElement>, selectedAnswer: number) => void;
  testsLength: number;
  testNumber: number;
}

interface RadioEventTarget extends EventTarget {
  value: string;
  checked: boolean;
}

export const TestingForm: FC<TestingFormProps> = ({
  test,
  onSubmit,
  testsLength,
  testNumber,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<RadioEventTarget | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.currentTarget);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (selectedAnswer) {
      onSubmit(e, Number(selectedAnswer.value));
      selectedAnswer.checked = false;
    }
    setSelectedAnswer(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={s.question}>{`${testNumber}. ${test.questionText}`}</h2>
      <fieldset className={s.fieldset}>
        {test.answers.map((answer, index) => {
          return (
            <label
              key={index}
              className={
                selectedAnswer && Number(selectedAnswer.value) === index
                  ? cn(s.selectedAnswer, s.answer)
                  : s.answer
              }
            >
              <input
                name="answer"
                value={index}
                type="radio"
                className={s.radioButton}
                onChange={handleChange}
              />
              <span className={s.answerText}>{answer}</span>
            </label>
          );
        })}
      </fieldset>
      <button
        type="submit"
        className={s.submitButton}
        disabled={selectedAnswer || selectedAnswer === 0 ? false : true}
      >
        {testsLength === testNumber ? 'Завершити' : 'Далі'}
      </button>
    </form>
  );
};
