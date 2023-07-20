import { CheckYourMail } from './CheckYourMail';
import { ForgetPasswordForm } from './ForgetPasswordForm';
import { NewPasswordForm } from './NewPasswordForm';
import { PasswordRecovered } from './PasswordRecovered';

import useUserData from 'hooks/useUserData';
import {
  didNewPassInstructionSent,
  didChangedPassSent,
} from '../../redux/auth/auth-selectors';

import useAppSelector from 'hooks/useAppSelector';

export const ForgotPassPageComponent = () => {
  const { isParcedUserDataProper: isAddressContainsCredentials } = useUserData();

  const wasInstructionSent = useAppSelector(didNewPassInstructionSent);
  const wasChangedPassSent = useAppSelector(didChangedPassSent);

  return (
    <>
      {!wasInstructionSent && !wasChangedPassSent && !isAddressContainsCredentials && (
        <ForgetPasswordForm />
      )}
      {wasInstructionSent && !wasChangedPassSent && !isAddressContainsCredentials && (
        <CheckYourMail />
      )}
      {wasInstructionSent && !wasChangedPassSent && isAddressContainsCredentials && (
        <NewPasswordForm />
      )}
      {wasInstructionSent && wasChangedPassSent && <PasswordRecovered />}
    </>
  );
};
