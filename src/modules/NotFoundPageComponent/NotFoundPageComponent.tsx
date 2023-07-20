import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { ROUTES } from 'routes/routes.const';
import textPage from 'data/notFoundPageText.json';

import { Button } from 'ui-kit/components/CommonsButtons/Button';
import { ICONS } from 'ui-kit/icons';

import s from './NotFoundPageComponet.module.scss';

export const NotFoundPageComponent: FC = () => {
  const navigate = useNavigate();
  return (
    <section className={cn('container', s.notFoundWrapper)}>
      <div className={s.notFoundSvgWrapper}>
        <ICONS.NOT_FOUND width={396} height={166} />
      </div>
      <p className={s.notFoundText}>{textPage.text}</p>
      <Button
        text={textPage.textBtn}
        icon
        onClick={() => navigate(ROUTES.HOME)}
        moreStyles={s.notFoundBtn}
      />
    </section>
  );
};
