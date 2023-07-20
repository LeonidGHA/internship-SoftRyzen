import { FC, ReactNode } from 'react';
import cn from 'classnames';

import s from './Tabs.module.scss';

export type TabType = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: TabType[];
  activeTab: number;
  isTabDisabled: boolean[];
  onClick: (index: number) => void;
}

export const Tabs: FC<TabsProps> = ({ tabs, activeTab, isTabDisabled, onClick }) => {
  const handleTabClick = (tabIndex: number) => {
    if (!isTabDisabled[tabIndex]) {
      onClick(tabIndex);
    }
  };

  return (
    <>
      <ul className={s.tabsNav}>
        {tabs.map(({ label }, index) => (
          <li
            key={index}
            className={cn(s.label, {
              [s.active]: activeTab === index,
              [s.disabled]: isTabDisabled[index],
            })}
            onClick={() => handleTabClick(index)}
          >
            {label}
          </li>
        ))}
      </ul>
      <div>{tabs[activeTab].content}</div>
    </>
  );
};
