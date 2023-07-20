import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { ICONS } from 'ui-kit/icons';

import s from './Modal.module.scss';

const modal = document.querySelector<Element>('#modal');

interface IModalProps {
  onClick: () => void;
  backDropBGColor?: 'LightBlue' | 'Gray';
  modalBGColor?: 'White' | 'LightBlue';
  modalPaddingY?: '40px' | '60px';
  modalPaddingX?: '54px' | '38px' | '28px';
  children?: ReactNode;
  classNameModal?: string;
}

const Modal: FC<IModalProps> = ({
  onClick,
  children,
  backDropBGColor = 'Gray',
  modalBGColor = 'White',
  modalPaddingY = '60px',
  modalPaddingX = '28px',
  classNameModal,
}) => {
  const finalModalClassName = cn(
    s.modal,
    {
      [s.modalBGColorWhite]: modalBGColor === 'White',
      [s.modalBGColorLightBlue]: modalBGColor === 'LightBlue',
      [s.modalPaddingXSmall]: modalPaddingX === '28px',
      [s.modalPaddingXMedium]: modalPaddingX === '38px',
      [s.modalPaddingXLarge]: modalPaddingX === '54px',
      [s.modalPaddingYSmall]: modalPaddingY === '40px',
      [s.modalPaddingYLarge]: modalPaddingY === '60px',
    },
    classNameModal
  );
  useEffect(() => {
    document.body.classList.add('blockScroll');
    document.addEventListener('keydown', onClickEscClose);

    return () => {
      document.removeEventListener('keydown', onClickEscClose);
      document.body.classList.remove('blockScroll');
    };
  });

  const onClickEscClose = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const onClickBackdropClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return modal
    ? createPortal(
        <div
          id="backdrop"
          className={cn(s.backdrop, {
            [s.backdropBGColorGray]: backDropBGColor === 'Gray',
            [s.backdropBGColorLightBlue]: backDropBGColor === 'LightBlue',
          })}
          onClick={onClickBackdropClose}
        >
          <div className={finalModalClassName}>
            <button
              type="button"
              aria-label="Кнопка закриття модального вікна"
              onClick={onClick}
              className={cn(s.modalIconCloseWrapper, {
                [s.modalIconCloseWrapperIndentSm]: modalPaddingY === '40px',
                [s.modalIconCloseWrapperIndentLg]: modalPaddingY === '60px',
              })}
            >
              <ICONS.CROSS_SMALL width={24} height={24} className={s.modalIconClose} />
            </button>
            {children}
          </div>
        </div>,
        modal
      )
    : null;
};

export default Modal;
