import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import useAppDispatch from 'hooks/useAppDispatch';
import { incrementPage } from '../../../redux/testing/testingPageSlice';

import { Button } from 'ui-kit/components/CommonsButtons/Button';
import { Checkbox } from 'ui-kit/components/Checkbox';

import data from 'data/rulesComponent.json';

import s from './RulesForm.module.scss';

export type TypeFormValues = {
  agreement: string;
};

const RulesForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<TypeFormValues>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TypeFormValues> = () => {
    dispatch(incrementPage());
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Checkbox
        register={register('agreement', {
          required: `${data.form.errorText}`,
        })}
        typeForm={'SignIn'}
        labelText={`${data.form.labelText}`}
        error={errors?.agreement?.message}
      />
      <Button
        text={`${data.form.btnText}`}
        type={'submit'}
        moreStyles={s.continueBtn}
        icon
        centered
        isDisabled={!Object.keys(dirtyFields).includes('agreement')}
        mainPageSubmitVariant
      />
    </form>
  );
};

export default RulesForm;
