import { CastingCards } from './CastingCards';
import { Title } from 'ui-kit/components/typography/Title';

import { castingProcess } from 'data/castingProcess';

import s from './CastingProcess.module.scss';
import { CastingCardData } from 'constants/types';

export interface CastingProcessData {
  title: string;
  castingCards: CastingCardData[];
}

export const CastingProcess = () => {
  return (
    <div className={s.wrapper}>
      <Title Tag="h2" accent className={s.title}>
        {castingProcess.title}
      </Title>
      <ul className={s.list}>
        <CastingCards cardsContent={castingProcess.castingCards} />
      </ul>
    </div>
  );
};
