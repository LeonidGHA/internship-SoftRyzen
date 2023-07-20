type KeyType =
  | 'whatProjectsInterested'
  | 'haveProjects'
  | 'education'
  | 'desiredSalary'
  | 'desiredSalary'
  | 'isDataProcessingConsent';

type AreaType = {
  key: KeyType;
  label: string;
  errMsg: string;
  placeholder: string;
  rows: number;
};

type CheckboxType = {
  key: KeyType;
  label: string;
  errMsg: string;
};

type FormInputType = {
  textareas: AreaType[];
  check: CheckboxType;
};

export const experienceForm: FormInputType = {
  textareas: [
    {
      key: 'whatProjectsInterested',
      label:
        'Які проекти/задачі/технології/інструменти вас цікавлять та хотіли б вивчити протягом стажування?',
      placeholder:
        'Які проекти/задачі/технології/інструменти вас цікавлять та хотіли б вивчити протягом стажування?',
      errMsg: "Це поле є обов'язковим",
      rows: 8,
    },
    {
      key: 'haveProjects',
      label:
        'Чи є у Вас проекти, над якими Ви працювали раніше, та як Ви досягали успіху у їх виконанні?',
      placeholder:
        'Чи є у Вас проекти, над якими Ви працювали раніше, та як Ви досягали успіху у їх виконанні?',
      errMsg: "Це поле є обов'язковим",
      rows: 8,
    },
    {
      key: 'education',
      label: 'Ваша освіта та спеціалізація до ІТ?',
      placeholder: 'Ваша освіта та спеціалізація до ІТ?',
      errMsg: "Це поле є обов'язковим",
      rows: 3,
    },
    {
      key: 'desiredSalary',
      label: 'Вкажіть бажану заробітну плату',
      placeholder: 'Вкажіть бажану заробітну плату',
      errMsg: "Це поле є обов'язковим",
      rows: 3,
    },
  ],
  check: {
    key: 'isDataProcessingConsent',
    label:
      'Цією заявкою ви надаєте свою згоду на збір та обробку наданих вами персональних даних для використання SoftRyzen для письмового чи усного спілкування з вами.',
    errMsg: "Це поле є обов'язковим",
  },
};
