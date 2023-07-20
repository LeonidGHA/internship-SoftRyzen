import { FC } from 'react';

import { ChooseDirectionModal } from 'modules/modals/ChooseDirectionModal';
import Modal from 'ui-kit/components/Modal/Modal';
import { Button } from 'ui-kit/components/CommonsButtons/Button';

import { useCurrentWidth } from 'hooks/useCurrentWidth';
import useToggleOpenModal from 'hooks/useToggleOpenModal';
import useAppDispatch from 'hooks/useAppDispatch';
import {
  updateFormData,
  updateCollectorStep,
} from '../../../../redux/formDataCollector/formDataSlice';
import { getIcon } from 'utils/getIcon';

import s from './DirectionCard.module.scss';

interface DirectionCardProps {
  dataObject: {
    direction: string;
    description: string;
    technologies: string[];
  };
}

export const DirectionCard: FC<DirectionCardProps> = ({ dataObject }) => {
  const { isOpen, toggleOpen } = useToggleOpenModal();
  const dispatch = useAppDispatch();
  const { direction, description, technologies } = dataObject;
  const windowWidth = useCurrentWidth();

  const saveDirection = () => {
    dispatch(updateFormData({ direction }));
    dispatch(updateCollectorStep(3));
  };

  const Icon = getIcon(direction);

  return (
    <>
      <div className={s.iconBox}>
        <Icon className={s.icon} />
      </div>

      <div className={s.descWrapper}>
        <h3 className={s.title}>{direction}</h3>
        <p className={s.desc}>{description}</p>
      </div>

      {windowWidth >= 1440 && (
        <ul className={s.techList}>
          {technologies.map((el, index) => {
            return (
              <li className={s.techItem} key={index}>
                <span>{el}</span>
              </li>
            );
          })}
        </ul>
      )}

      <div className={s.btnsWrapper}>
        <Button
          externalLink="https://www.google.com/"
          text="Програма напряму"
          lightVariant
          shortVariant
          moreStyles={s.programBtn}
        />

        <Button
          type="button"
          text="Обрати напрям"
          shortVariant
          moreStyles={s.chooseBtn}
          onClick={toggleOpen}
        />
      </div>
      {isOpen && (
        <Modal
          onClick={toggleOpen}
          backDropBGColor="Gray"
          modalPaddingY="40px"
          modalPaddingX="54px"
          modalBGColor="LightBlue"
        >
          <ChooseDirectionModal
            direction={direction}
            toggleModal={toggleOpen}
            handleClik={saveDirection}
          />
        </Modal>
      )}
    </>
  );
};
