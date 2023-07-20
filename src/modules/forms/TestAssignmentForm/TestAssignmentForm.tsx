import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from 'ui-kit/components/CommonsButtons/Button';
import TestAssignmentInput from './TestAssignmentInput/TestAssignmentInput';
import TestAssignmentTextarea from './TestAssignmentTextarea/TestAssignmentTextarea';
import { RadioBtnInput } from 'ui-kit/components/RadioBtnInput';

import s from './TestAssignmentForm.module.scss';
import { usePostTaskDataMutation } from '../../../redux/testing/testingSlice';

export type TypeFormValues = {
  project: string;
  repository: string;
  text: string;
  variant: string;
};
type TypeFormProps = {
  formattedDate: string;
};

const TestAssignmentForm: FC<TypeFormProps> = ({ formattedDate }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<TypeFormValues>();

  const [postData] = usePostTaskDataMutation();

  const onSubmit: SubmitHandler<TypeFormValues> = async (data) => {
    const formData = {
      livePageLink: data.project,
      repositoryLink: data.repository,
      difficulty: data.variant,
      comments: data.text,
    };

    const test = await postData(formData);
    console.log(test);

    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={s.deadline}>Дедлайн: {formattedDate}</p>
      <TestAssignmentInput
        label="Посилання на живу сторінку проекту"
        id="project"
        placeholder="Введіть посилання"
        register={register('project', {
          required: `Це поле обов'язкове`,
          validate: {
            link: (value: string) => {
              if (!/^https:\/\/[\w\d:/.=?-]{25,}$/.test(value)) {
                return 'Введіть повне валідне посилання сторінки';
              }
              return undefined;
            },
          },
        })}
        error={errors?.project?.message}
        type={'text'}
      />
      <TestAssignmentInput
        label="Посилання на репозиторій з кодом"
        id="repository"
        placeholder="Введіть посилання"
        register={register('repository', {
          required: `Це поле обов'язкове`,
          validate: {
            link: (value: string) => {
              if (!/^https:\/\/[\w\d:/.=?-]{25,}$/.test(value)) {
                return 'Введіть повне валідне посилання на репозиторій';
              }
              return undefined;
            },
          },
        })}
        error={errors?.repository?.message}
        type={'text'}
      />
      <p className={s.radioTitle}>Оцініть складність тестового завдання:</p>
      <div className={s.radioWrapper}>
        <RadioBtnInput
          labelText="Легке"
          register={register('variant', { required: 'required' })}
          value="Легке"
          watchValue={watch('variant')}
          colorRadio="green"
        />
        <RadioBtnInput
          labelText="Середнє"
          register={register('variant', { required: 'required' })}
          value="Середнє"
          watchValue={watch('variant')}
          colorRadio="blue"
        />
        <RadioBtnInput
          labelText="Важке"
          register={register('variant', { required: 'required' })}
          value="Важке"
          watchValue={watch('variant')}
          colorRadio="red"
        />
      </div>
      <TestAssignmentTextarea
        label="Які труднощі виникли при виконанні"
        id="text"
        placeholder="Введіть інформацію"
        error={errors?.text?.message}
        register={register('text', {
          required: `Це поле обов'язкове`,
        })}
      />
      <p className={s.warning}>
        Здати Тестове завдання можна тільки один раз. Перевірте, чи ви правильно внесли
        всі необхідні дані.
      </p>
      <Button
        text={`Відправити`}
        type={'submit'}
        moreStyles={s.submitBtn}
        icon
        centered
        authSubmitVariant
        isDisabled={
          !Object.keys(dirtyFields).includes('project') ||
          !Object.keys(dirtyFields).includes('repository') ||
          !Object.keys(dirtyFields).includes('variant') ||
          !Object.keys(dirtyFields).includes('text')
        }
      />
      <p className={s.help}>
        Якщо виникли технічні труднощі з відправкою ТЗ - звертайтесь
        <a
          className={s.link}
          href="https://t.me/Kuznietsova_Oksana"
          rel="noopener noreferrer nofollow"
          target="_blank"
          aria-label="Посилання на телеграм"
        >
          {' '}
          https://t.me/Kuznietsova_Oksana
        </a>
      </p>
    </form>
  );
};

export default TestAssignmentForm;
