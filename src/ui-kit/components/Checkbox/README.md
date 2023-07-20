## Example

```
import { Checkbox } from 'ui-kit/components/Checkbox';

<Checkbox
register={register('check', { required: 'required' })}
labelText="Запам'ятати мене"
typeForm="SignIn"
/>

<Checkbox
register={register('check', { required: 'required' })}
labelText="надсилання данних за цією заявкою ви"
typeForm="SignUp"
error={errors?.check?.message}
/>

```
