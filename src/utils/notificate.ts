import { toast, Id } from 'react-toastify';

import { ICONS } from 'ui-kit/icons/icons.const';
import notifications from '../constants/notifications.json';

type toastKind = 'success' | 'error' | 'warning';

const notificate = (toastKind: toastKind, header: string, text: string): Id => {
  const toastSetup = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: notifications.autoCloseTime,
    icon:
      toastKind === 'error'
        ? ICONS.TOAST_ERROR
        : toastKind === 'warning'
        ? ICONS.TOAST_WARNING
        : ICONS.TOAST_SUCCESS,
  };

  return toast[toastKind](`${header ? header + '\n' + text : text}`, toastSetup);
};

export default notificate;
