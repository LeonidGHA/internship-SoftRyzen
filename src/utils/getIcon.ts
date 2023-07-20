import { ICONS } from 'ui-kit/icons';

export const getIcon = (iconKey: string) => {
  let Icon;
  switch (iconKey.toLowerCase()) {
    case 'user':
      Icon = ICONS.USER;
      break;
    case 'settings':
      Icon = ICONS.SETTINGS;
      break;
    case 'logout':
      Icon = ICONS.LOGOUT;
      break;
    case 'fronted':
      Icon = ICONS.CODING;
      break;
    case 'backend':
      Icon = ICONS.BACKEND;
      break;
    case 'designer':
      Icon = ICONS.WEB_DESIGN;
      break;
    case 'pm':
      Icon = ICONS.MANAGEMENT;
      break;
    case 'qa':
      Icon = ICONS.DEBUGGING;
      break;

    default:
      Icon = ICONS.CODING;
      break;
  }

  return Icon;
};
