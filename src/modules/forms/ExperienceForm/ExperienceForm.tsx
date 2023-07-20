import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { Textarea } from 'ui-kit/components/Textarea';
import { Checkbox } from 'ui-kit/components/Checkbox';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { isAuthLoading } from '../../../redux/auth/auth-selectors';
import { formData } from '../../../redux/formDataCollector/formSelectors';
import { updateFormData } from '../../../redux/formDataCollector/formDataSlice';
import { updateUser } from '../../../redux/auth/auth-operations';

import { experienceForm } from 'data/experienceForm';
import s from './ExperienceForm.module.scss';

interface IProps {
  className?: string;
}

export type FormInputsType = {
  whatProjectsInterested: string;
  haveProjects: string;
  education: string;
  desiredSalary: string;
  isDataProcessingConsent: boolean;
};

export const ExperienceForm = ({ className }: IProps) => {
  const { check, textareas } = experienceForm;

  const dispatch = useAppDispatch();
  const storedData = useAppSelector(formData);
  const isLoading = useAppSelector(isAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({ defaultValues: storedData });

  const onSubmit = async (data: FormInputsType) => {
    if (isLoading) {
      return;
    }

    dispatch(updateFormData(data));

    const updatedFormData = {
      ...storedData,
      ...data,
    };
    if (updatedFormData.documentationTestUrl === '') {
      delete updatedFormData.documentationTestUrl;
    }

    dispatch(updateUser(updatedFormData));
  };

  return (
    <form className={cn(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
      {textareas.map(({ key, label, placeholder, errMsg, rows }) => (
        <Textarea
          className={s.textarea}
          key={key}
          label={label}
          placeholder={placeholder}
          register={register(key, { required: { value: true, message: errMsg } })}
          error={errors[key]?.message}
          rows={rows}
        />
      ))}

      <Checkbox
        className={s.checkBox}
        typeForm="SignIn"
        labelText={check.label}
        register={register(check.key, {
          required: { value: true, message: check.label },
        })}
        error={errors[check.key]?.message}
      />
      <Button
        text="Відправити"
        type="submit"
        mainPageSubmitVariant
        icon
        centered
        isDisabled={isLoading}
      />
    </form>
  );
};
