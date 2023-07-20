import { ContactForm } from 'modules/forms/ContactForm';
import { Title } from 'ui-kit/components/typography/Title';

import txt from 'data/welcomeFormTxt.json';
import s from './WelcomeForm.module.scss';

export const WelcomeForm = () => {
  return (
    <section>
      <div className={s.container}>
        <Title className={s.title} Tag="h2" accent>
          {txt.title}
        </Title>
        <p className={s.description}>{txt.description}</p>
        <Title Tag="h2" className={s.titleForm}>
          {txt.formTitle}
        </Title>
        <ContactForm />
      </div>
    </section>
  );
};
