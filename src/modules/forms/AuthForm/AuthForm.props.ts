export interface IDataProps {
  title: string;
  navLink: {
    textBeforeLink: string;
    textLink: string;
  };
  separationText: string;
  inputEmailText: {
    label: string;
    placeholder: string;
  };
  inputPasswordText: {
    label: string;
    placeholder: string;
  };
  checkboxText: string;
  textBtnLinkText?: string;
  buttonSubmitText: string;
}

export interface INotificationAuthMessages {
  email: {
    patternMessage: string;
    minLengthMessage: string;
    maxLengthMessage: string;
    checkEmailLoginMessage: string;
    checkEmailRegistrationMessage: string;
  };
  password: {
    patternMessage: string;
    minLengthMessage: string;
    maxLengthMessage: string;
  };
  registration: {
    success: {
      title: string;
      message: string;
    };
  };
}
