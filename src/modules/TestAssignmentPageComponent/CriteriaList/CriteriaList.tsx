import { FC } from 'react';

// import data from 'data/testAssignmentComponent.json';

import { ICONS } from 'ui-kit/icons';

import s from './criteriaList.module.scss';
import { PostTaskDataResponse } from 'redux/testing/testingSlice';

type CriteriaListProps = {
  data: PostTaskDataResponse[];
};

const CriteriaList: FC<CriteriaListProps> = ({ data }) => {
  return (
    <ul className={s.list}>
      {data &&
        data[0].acceptanceCriteria.map((rule, i) => (
          <li key={i} className={s.ruleItem}>
            <div className={s.iconWrapper}>
              <ICONS.CHECK_MARK width={12} height={12} />
            </div>
            <p className={s.text}>{rule}</p>
          </li>
        ))}
    </ul>
  );
};

export default CriteriaList;
