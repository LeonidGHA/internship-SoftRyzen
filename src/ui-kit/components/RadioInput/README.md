## Example

```
import { RadioInput } from 'ui-kit/components/RadioInput';
import { useForm } from 'react-hook-form';

const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormInputsType>();


  <RadioInput
    labelText="Варіантa"
    register={register('variant')}
    value="Варіант"
    shapeRadio="circle"
    fontSize="18px"
    isRegularFont
    watchValue={watch('variant')}
    />

  <RadioInput
    labelText="Pre-Intermediate (А2)"
    register={register('variant', { required: 'required' })}
    value="Pre-Intermediate (А2)"
    shapeRadio="square"
    watchValue={watch('variant')}
    labelGap="24px"
    error={errors?.variant?.message}
    />
```
