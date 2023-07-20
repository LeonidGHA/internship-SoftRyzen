import { useEffect } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';

import { resetForgotPassSteps } from '../../redux/auth/auth-slice';

import AuthFormText from 'data/AuthFormText.json';

import { AuthForm } from 'modules/forms/AuthForm';

const LoginPageComponent: React.FC = () => {
  const { login, notification } = AuthFormText;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetForgotPassSteps());
  }, []);

  return <AuthForm typeAuth="LogIn" data={login} notification={notification} />;
};

export default LoginPageComponent;
