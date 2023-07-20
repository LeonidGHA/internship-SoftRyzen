import AuthFormText from 'data/AuthFormText.json';

import { AuthForm } from 'modules/forms/AuthForm';

const RegisterPageComponent: React.FC = () => {
  const { registration, notification } = AuthFormText;
  return (
    <AuthForm typeAuth="Registration" data={registration} notification={notification} />
  );
};

export default RegisterPageComponent;
