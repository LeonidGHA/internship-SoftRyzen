import { useState } from 'react';

import { SkillsForm } from 'modules/forms/SkillsForm';
import { ExperienceForm } from 'modules/forms/ExperienceForm';
import { Title } from 'ui-kit/components/typography/Title';
import { TabType, Tabs } from 'ui-kit/components/Tabs';

import txt from 'data/tabNav.json';
import s from './TabsForm.module.scss';

export const TabsForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isTabDisabled, setIsTabDisabled] = useState([false, true]);

  const activateNextTab = () => {
    setTabIndex(tabIndex + 1);
    setIsTabDisabled((prevState) =>
      prevState.map((value, index) => (index === tabIndex + 1 ? false : value))
    );
  };

  const tabs: TabType[] = [
    {
      label: txt.skills,
      content: <SkillsForm onClick={activateNextTab} />,
    },
    {
      label: txt.experience,
      content: <ExperienceForm />,
    },
  ];
  return (
    <section className={s.section}>
      <div className={s.container}>
        <Title className={s.title} Tag="h2">
          Просимо надати інформацію про себе
        </Title>
        <Tabs
          tabs={tabs}
          activeTab={tabIndex}
          isTabDisabled={isTabDisabled}
          onClick={setTabIndex}
        />
      </div>
    </section>
  );
};
