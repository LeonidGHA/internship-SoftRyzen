import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { Input } from 'ui-kit/components/Input';
import { Button } from 'ui-kit/components/CommonsButtons/Button';
import { RadioInput } from 'ui-kit/components/RadioInput';
import { Textarea } from 'ui-kit/components/Textarea';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { formData } from '../../../redux/formDataCollector/formSelectors';
import { updateFormData } from '../../../redux/formDataCollector/formDataSlice';

import inputTxt from 'data/skillsForm.json';
import s from './SkillsForm.module.scss';

interface IProps {
  onClick: () => void;
  className?: string;
}

export type FormInputsType = {
  englishLevel: string;
  whyAreYou: string;
  resumeUrl: string;
  documentationTestUrl?: string;
};

export const SkillsForm = ({ onClick, className }: IProps) => {
  const { englishLevel, whyAreYou, resumeUrl, documentationTestUrl } = inputTxt;

  const dispatch = useAppDispatch();
  const storedData = useAppSelector(formData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputsType>({ defaultValues: storedData });

  const onSubmit = async (data: FormInputsType) => {
    onClick();
    dispatch(updateFormData(data));
  };

  return (
    <form className={cn(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={s.fieldset}>
        <legend className={s.fieldsetTitle}>{englishLevel.title}</legend>
        {englishLevel.levels.map((lvl) => (
          <RadioInput
            key={lvl}
            labelText={lvl}
            register={register('englishLevel', { required: 'required' })}
            value={lvl}
            shapeRadio="square"
            watchValue={watch('englishLevel')}
            labelGap="20px"
            error={errors?.englishLevel?.message}
          />
        ))}
      </fieldset>
      <Textarea
        className={s.textarea}
        label={whyAreYou.label}
        placeholder={whyAreYou.placeholder}
        rows={8}
        register={register('whyAreYou', {
          required: { value: true, message: whyAreYou.errMsg },
        })}
        error={errors.whyAreYou?.message}
      />
      <div className={s.linkWraper}>
        <Input
          className={s.input}
          label={resumeUrl.label}
          type="url"
          placeholder={resumeUrl.placeholder}
          register={register('resumeUrl', {
            required: { value: true, message: resumeUrl.errMsg },
            pattern: {
              value: new RegExp(
                '^((ftp|http|https)://)?(www\\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\\.?)*\\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(/([\\w#!:.?+=&%@!\\-/])*)?'
              ),
              message: 'Введіть дійсне посилання',
            },
          })}
          error={errors.resumeUrl?.message}
        />
        <Input
          className={s.input}
          label={documentationTestUrl.label}
          type="url"
          placeholder={documentationTestUrl.placeholder}
          register={register('documentationTestUrl')}
        />
      </div>
      <Button text="Продовжити" type="submit" mainPageSubmitVariant icon centered />
    </form>
  );
};
