import { WelcomeForm } from 'modules/FormController/WelcomeForm';
import { ChooseDirection } from 'modules/FormController/ChooseDirection';
import { TabsForm } from 'modules/FormController/TabsForm';

import useAppSelector from 'hooks/useAppSelector';
import { collectorStep } from '../../redux/formDataCollector/formSelectors';

export const FormController = () => {
  const step = useAppSelector(collectorStep);

  return (
    <>
      {step === 1 && <WelcomeForm />}
      {step === 2 && <ChooseDirection />}
      {step === 3 && <TabsForm />}
    </>
  );
};
