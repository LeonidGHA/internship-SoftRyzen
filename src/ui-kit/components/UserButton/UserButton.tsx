import { useState, useEffect, useRef, FC } from 'react';

import { DropdownList } from 'ui-kit/components/DropdownList';
import { ICONS } from 'ui-kit/icons';
import { LogOut } from 'modules/modals/LogOut';
import Modal from 'ui-kit/components/Modal/Modal';

import useToggleOpenModal from 'hooks/useToggleOpenModal';

import userOptions from 'data/userOptions.json';
import s from './UserButton.module.scss';

interface UserButtonProps {
  avatarURL?: string;
}

const getIcon = (iconKey: string) => {
  let Icon;
  switch (iconKey) {
    case 'USER':
      Icon = ICONS.USER;
      break;
    case 'SETTINGS':
      Icon = ICONS.SETTINGS;
      break;
    case 'LOGOUT':
      Icon = ICONS.LOGOUT;
      break;
    default:
      Icon = null;
      break;
  }

  return Icon;
};

export const UserButton: FC<UserButtonProps> = ({ avatarURL }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalOptions = useToggleOpenModal();
  const dropboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target instanceof Node) || !dropboxRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  const handleBtnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (key: string) => {
    if (key === 'LOGOUT') {
      modalOptions.toggleOpen();
    } else {
      console.log('Go to page', key);
    }

    setIsOpen(false);
  };

  const options = userOptions.map(({ label, icon }) => ({
    label,
    Icon: getIcon(icon),
    onClick: () => handleItemClick(icon),
  }));

  return (
    <div className={s.menuContainer} ref={dropboxRef}>
      <button className={s.btn} type="button" onClick={handleBtnClick}>
        {avatarURL ? (
          <img src={avatarURL} width={32} height={32} alt="Фото користувача" />
        ) : (
          <div>
            <ICONS.DEFAULT_AVATAR width={32} height={32} />
          </div>
        )}
      </button>
      {isOpen && <DropdownList options={options} />}
      {modalOptions.isOpen && (
        <Modal
          onClick={modalOptions.toggleOpen}
          backDropBGColor="LightBlue"
          modalPaddingY="60px"
          modalPaddingX="38px"
          modalBGColor="White"
        >
          <LogOut toggleModal={modalOptions.toggleOpen} />
        </Modal>
      )}
    </div>
  );
};
