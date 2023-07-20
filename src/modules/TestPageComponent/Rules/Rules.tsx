import { FC } from 'react';
import RulesForm from '../../forms/RulesForm/RulesForm';
import data from 'data/rulesComponent.json';

import s from './Rules.module.scss';

export const Rules: FC = () => {
  return (
    <section>
      <div className={`mainContainer ${s.rulesContainer}`}>
        <h1 className={s.title}>
          {data.title} <span>{data.subtitle}</span>
        </h1>
        <ul className={s.list}>
          {data.list.map((item) => (
            <li key={item.number} className={s.item}>
              <span>{item.number}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <RulesForm />
      </div>
    </section>
  );
};
