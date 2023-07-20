import { useState, Dispatch, SetStateAction } from 'react';

interface ToggleOpenModalReturnType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
}

const useToggleOpenModal = (): ToggleOpenModalReturnType => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, setIsOpen, toggleOpen };
};

export default useToggleOpenModal;
