import { FC } from 'react';
import s from './TabsLine.module.scss';

import { ICONS } from 'ui-kit/icons';

interface TypeTabsLineProps {
  quantityQuestions: number;
  currentQuestion: number;
}

const TabsLine: FC<TypeTabsLineProps> = ({ quantityQuestions, currentQuestion }) => {
  return (
    <div className={s.tabsWrapper}>
      <p>
        Питання {currentQuestion}/{quantityQuestions}
      </p>
      <div className={s.customLine}>
        {[...Array(quantityQuestions)].map((_, index) => (
          <div
            key={index}
            className={`${s.line} ${index < currentQuestion ? s.active : ''}`}
          />
        ))}
        <ICONS.FLAG width={24} height={24} className={s.iconFlag} />
      </div>
    </div>
  );
};

export default TabsLine;
