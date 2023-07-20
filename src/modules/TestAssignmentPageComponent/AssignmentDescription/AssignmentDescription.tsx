import { FC } from 'react';

import s from './AssignmentDescription.module.scss';
import { PostTaskDataResponse } from 'redux/testing/testingSlice';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

type CriteriaListProps = {
  data: PostTaskDataResponse;
};

const AssignmentDescription: FC<CriteriaListProps> = ({ data }) => {
  return (
    <div className={s.assignmentDescription}>
      <h2 className={s.title}>{data.title}</h2>
      <p className={s.description}>{data.shortDescription}</p>
      <h3 className={`${s.material} ${s.subtitle}`}>Матеріали:</h3>
      <div className={s.btnWrapper}>
        <Button moreStyles={s.button} text={`Документація`} externalLink={data.link} />
        <Button moreStyles={s.button} text={`Макет`} externalLink={data.materials[1]} />
      </div>
    </div>
  );
};

export default AssignmentDescription;
