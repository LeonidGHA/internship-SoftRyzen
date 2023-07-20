import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Title } from 'ui-kit/components/typography/Title';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import { ROUTES } from 'routes/routes.const';
import passwordRecovered from 'data/passwordRecovered.json';

import s from './PasswordRecovered.module.scss';

export const PasswordRecovered = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <>
      <Title Tag="h1" className={s.title}>
        {passwordRecovered.title}
      </Title>
      <p className={s.par}>{passwordRecovered.text}</p>
      <Button
        text={passwordRecovered.button.text}
        authSubmitVariant
        centered
        icon
        link={ROUTES.LOGIN}
      />
    </>
  );
};
