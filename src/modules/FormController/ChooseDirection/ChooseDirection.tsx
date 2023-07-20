import { useEffect } from 'react';

import { DirectionCard } from 'ui-kit/components/cards/DirectionCard';
import { Spinner } from 'ui-kit/components/Spinner';

import { useGetDirectionsQuery } from '../../../redux/api/DirectionsApi';
import notificate from 'utils/notificate';

import cardData from 'data/directions.json';
import s from './ChooseDirection.module.scss';

export const ChooseDirection = () => {
  const { data: directions, isLoading, isError } = useGetDirectionsQuery();

  useEffect(() => {
    if (isError) {
      notificate('error', '', cardData.errMsg);
    }
  }, [isError]);

  return (
    <section className={s.pageSection}>
      <div className={s.container}>
        <h2 className={s.pageTitle}>{cardData.pageTitle}</h2>

        {isLoading && <Spinner />}

        {directions && directions.length > 0 && (
          <ul className={s.cardsList}>
            {directions?.map((el) => {
              return (
                <li className={s.cardItem} key={el.id}>
                  <DirectionCard dataObject={el} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
