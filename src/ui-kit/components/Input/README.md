Компонент Input вже стилізований. Для позиціонування чи внесення додаткових стилів використовується проп className, який навішується на контейнер інпута.

Приклад використання:

1. В компоненті де буде використовуваттися інпут, витягаємо register та errors (якщо потрібно відобразити помилку валідації):

```tsx
const {
  register,
  formState: { errors },
} = useForm<T>();
```

2. Текст помилки беремо по імені інпута вказаного в register першим аргументом, наприклад:

```tsx
<Input
  register={register('password', {
    required: "Це поле обов'язкове",
    minLength: {
      value: 6,
      message: 'Мінімальна довжина 6 символів',
    },
  })}
  error={errors.password?.message}
/>
```

3. Інші пропси:
   placeholder - описує очікуване значення поля введення.
   label - підпис поля введення.
   type - тип поля введення ('text', 'password', 'email', 'url').
   value - початкове значення.
   button - буль для створення кнопки в інпуті.

4. Приклад:

```tsx
type FormValues = {
  email: string,
  password: string,
};

const HomeView = () => {
  const {
    register,
    formState: { errors },
  } =
    useForm <
    FormValues >
    {
      mode: 'onChange',
    };
  return (
    <>
      <Section>
        <Input
          label="E-mail"
          register={register('email', {
            required: "Це поле обов'язкове",
            pattern: {
              value: /^[\w][\w.-]{1,62}@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Введіть дійсну електронну пошту',
            },
          })}
          error={errors.email?.message}
          placeholder="Введіть поштову адресу"
          type="text"
        />
        <Input
          label="Пароль"
          register={register('password', {
            required: "Це поле обов'язкове",
            minLength: {
              value: 6,
              message: 'Мінімальна довжина 6 символів',
            },
          })}
          error={errors.password?.message}
          placeholder="Придумайте пароль"
          type="password"
          button
        />
      </Section>
    </>
  );
};
```
