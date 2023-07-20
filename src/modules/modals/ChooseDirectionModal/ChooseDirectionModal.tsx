import { FC } from 'react';

import modalText from 'data/chooseDirectionModalText.json';

import { Button } from 'ui-kit/components/CommonsButtons/Button';

import s from './ChooseDirectionModal.module.scss';

interface IChooseDirectionModalProps {
  handleClik: () => void;
  toggleModal: () => void;
  direction: string;
}

export const ChooseDirectionModal: FC<IChooseDirectionModalProps> = ({
  toggleModal,
  handleClik,
  direction,
}) => {
  return (
    <div className={s.chooseModalWrapper}>
      <h2 className={s.chooseModalTitle}>{modalText.choosenTitle}</h2>
      <span className={s.chooseModalSubtitle}>{direction}</span>
      <div className={s.chooseModalBtnsWrapper}>
        <Button
          text={modalText.btnChangeText}
          lightVariant
          type="button"
          moreStyles={s.chooseModalBtnBack}
          onClick={toggleModal}
        />
        <Button
          text={modalText.btnNextText}
          moreStyles={s.chooseModalBtnExit}
          onClick={handleClik}
          type="button"
        />
      </div>
    </div>
  );
};
