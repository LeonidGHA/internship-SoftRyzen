## Example

```

import Modal from 'ui-kit/components/Modal/Modal';
import useToggleOpenModal from 'hooks/useToggleOpenModal';

  const { isOpen, toggleOpen } = useToggleOpenModal();


{isOpen && (
        <Modal
          onClick={toggleOpen}
          backDropBGColor="Gray"
          modalPaddingY="40px"
          modalPaddingX="54px"
          modalBGColor="LightBlue"
        >
          <div>Hello</div>
        </Modal>
      )}

{isOpen && (
        <Modal
          onClick={toggleOpen}
          backDropBGColor="LightBlue"
          modalPaddingY="60px"
          modalPaddingX="28px"
          modalBGColor="White"
        >
          <div>Hello</div>
        </Modal>
      )}

      <button onClick={toggleOpen} type="button"></button>
```
