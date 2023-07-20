import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';
import PhoneInput from 'react-phone-input-2';

import { Input } from 'ui-kit/components/Input';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { formData } from '../../../redux/formDataCollector/formSelectors';
import {
  updateFormData,
  updateCollectorStep,
} from '../../../redux/formDataCollector/formDataSlice';

import txt from 'data/contactForm.json';
import 'react-phone-input-2/lib/style.css';
import s from './ContactForm.module.scss';

interface IProps {
  className?: string;
}

export type FormInputsType = {
  firstName: string;
  lastName: string;
  telegramContact: string;
  linkedinUrl: string;
  currentCity: string;
  phone: string;
};

export const ContactForm = ({ className }: IProps) => {
  const { firstName, lastName, phone, telegramContact, currentCity, linkedinUrl, btn } =
    txt;

  const dispatch = useAppDispatch();
  const storedData = useAppSelector(formData);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({ defaultValues: storedData });

  const onSubmit = async (data: FormInputsType) => {
    const formData = {
      ...data,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.replace(/[\s()-]/g, ''),
    };
    dispatch(updateFormData(formData));
    dispatch(updateCollectorStep(2));
  };

  return (
    <form className={cn(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={firstName.label}
        type="text"
        placeholder={firstName.placeholder}
        register={register('firstName', {
          required: { value: true, message: firstName.errMsg.required },
          minLength: { value: 2, message: firstName.errMsg.minLength },
          maxLength: { value: 30, message: firstName.errMsg.maxLength },
          validate: {
            noSymbol: (value: string) => {
              if (/^[\p{L}\s'-]+$/u.test(value)) {
                return undefined;
              }
              return firstName.errMsg.required;
            },
            OnlySpaces: (value: string) => {
              if (!/^\s+$/.test(value)) {
                return undefined;
              }
              return firstName.errMsg.minLength;
            },
            minLengthWithoutSpace: (value: string) => {
              const trimmedValue = value.trim();
              if (trimmedValue.length >= 2) {
                return undefined;
              }
              return firstName.errMsg.minLength;
            },
          },
          pattern: {
            value: /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'-\s]+$/,
            message: firstName.errMsg.pattern,
          },
        })}
        error={errors.firstName?.message}
      />
      <Input
        label={lastName.label}
        type="text"
        placeholder={lastName.placeholder}
        register={register('lastName', {
          required: { value: true, message: lastName.errMsg.required },
          minLength: { value: 2, message: lastName.errMsg.minLength },
          maxLength: { value: 30, message: lastName.errMsg.maxLength },
          validate: {
            noSymbol: (value: string) => {
              if (/^[\p{L}\s'-]+$/u.test(value)) {
                return undefined;
              }
              return lastName.errMsg.required;
            },
            OnlySpaces: (value: string) => {
              if (!/^\s+$/.test(value)) {
                return undefined;
              }
              return lastName.errMsg.minLength;
            },
            minLengthWithoutSpace: (value: string) => {
              const trimmedValue = value.trim();
              if (trimmedValue.length >= 2) {
                return undefined;
              }
              return lastName.errMsg.minLength;
            },
          },
          pattern: {
            value: /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'-\s]+$/,
            message: lastName.errMsg.pattern,
          },
        })}
        error={errors.lastName?.message}
      />
      <Controller
        name="phone"
        control={control}
        rules={{
          required: { value: true, message: phone.errMsg },
          validate: {
            minLength: (value: string) => {
              if (value.replace(/[\s()-]/g, '').length > 12) {
                return true;
              }
              return phone.errMsg;
            },
          },
        }}
        render={({ field }) => (
          <label className={s.phoneLabel}>
            {phone.label}
            <PhoneInput
              country={'ua'}
              excludeCountries={['ru']}
              localization={{ ua: 'Україна' }}
              inputProps={{
                name: field.name,
                onChange: field.onChange,
                onBlur: field.onBlur,
              }}
              {...field}
              containerClass={s.phoneContainer}
              inputClass={cn(s.phoneInput, { [s.inputError]: errors.phone?.message })}
              buttonClass={s.phoneBtn}
            />
            {errors?.phone && <p className={s.phoneErrorMsg}>{errors.phone?.message}</p>}
          </label>
        )}
      />
      <Input
        label={telegramContact.label}
        type="url"
        placeholder={telegramContact.placeholder}
        register={register('telegramContact', {
          required: { value: true, message: telegramContact.errMsg },
          minLength: { value: 18, message: telegramContact.errMsg },
          maxLength: { value: 45, message: telegramContact.errMsg },
          pattern: {
            value: new RegExp('^https://t.me/\\w+$'),
            message: telegramContact.errMsg,
          },
        })}
        error={errors.telegramContact?.message}
      />
      <Input
        label={currentCity.label}
        type="text"
        placeholder={currentCity.placeholder}
        register={register('currentCity', {
          required: { value: true, message: currentCity.errMsg.required },
          minLength: { value: 2, message: currentCity.errMsg.minLength },
          maxLength: { value: 30, message: currentCity.errMsg.maxLength },
        })}
        error={errors.currentCity?.message}
      />
      <Input
        label={linkedinUrl.label}
        type="url"
        placeholder={linkedinUrl.placeholder}
        register={register('linkedinUrl', {
          required: { value: true, message: linkedinUrl.errMsg },
          minLength: { value: 28, message: linkedinUrl.errMsg },
          pattern: {
            value: new RegExp('^https://www.linkedin.com/in/\\w+$'),
            message: linkedinUrl.errMsg,
          },
        })}
        error={errors.linkedinUrl?.message}
      />
      <Button text={btn.label} type="submit" mainPageSubmitVariant icon centered />
    </form>
  );
};
