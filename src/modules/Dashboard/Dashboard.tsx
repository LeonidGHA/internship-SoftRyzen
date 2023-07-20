import { CastingProcess } from 'modules/CastingProcess';
import { Title } from 'ui-kit/components/typography/Title';
import { Schedule } from 'modules/Dashboard/Schedule';

import useAppSelector from 'hooks/useAppSelector';
import { userData } from '../../redux/auth/auth-selectors';

import txt from 'data/dashboardText.json';
import s from './Dashboard.module.scss';

export const Dashboard = () => {
  const user = useAppSelector(userData);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.wrapperGrid}>
          <div className={s.descWrapper}>
            <Title Tag="h2" accent className={s.title}>
              {txt.title + user.firstName + '!'}
            </Title>

            <p className={s.description}>{txt.description}</p>

            <div className={s.cautionWrapper}>
              <Title Tag="h2" className={s.cautionTitle}>
                {txt.caution.title}
              </Title>

              <p>{txt.caution.msg}</p>
            </div>
          </div>

          <Schedule />
        </div>

        <CastingProcess />
      </div>
    </section>
  );
};
