import { FC } from 'react';

import Modal from 'ui-kit/components/Modal/Modal';
import useToggleOpenModal from 'hooks/useToggleOpenModal';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import s from './completeTest.module.scss';
import TestAssignmentForm from 'modules/forms/TestAssignmentForm/TestAssignmentForm';

type TypeCompleteTestProps = {
  formattedDate: string;
};

const CompleteTest: FC<TypeCompleteTestProps> = ({ formattedDate }) => {
  const { isOpen, toggleOpen } = useToggleOpenModal();

  return (
    <div className={s.formTabletWrapper}>
      <h2 className={s.formTitle}>Здати Тестове завдання</h2>
      <div className={s.box}>
        <p className={s.deadline}>Дедлайн: {formattedDate}</p>
        <Button
          text={`Відправити`}
          type={'button'}
          moreStyles={s.openModalBtn}
          icon
          centered
          authSubmitVariant
          onClick={toggleOpen}
        />
        <p className={s.warning}>
          Здати Тестове завдання можна тільки один раз. Перевірте, чи ви вірно внесли всі
          необхідні дані.
        </p>
      </div>
      {isOpen && (
        <Modal
          onClick={toggleOpen}
          backDropBGColor="Gray"
          modalPaddingY="40px"
          modalPaddingX="54px"
          modalBGColor="LightBlue"
        >
          <TestAssignmentForm formattedDate={formattedDate} />
        </Modal>
      )}
    </div>
  );
};

export default CompleteTest;
