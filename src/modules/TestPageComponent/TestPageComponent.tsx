import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import useAppSelector from 'hooks/useAppSelector';

import { Rules } from 'modules/TestPageComponent/Rules';
import { Startup } from 'modules/TestPageComponent/Startup';
import { Result } from 'modules/TestPageComponent/Result';

export const TestPageComponent: FC = () => {
  const testPage = useAppSelector((state) => state.testingPage);

  const location = useLocation();

  switch (testPage) {
    case 0:
      return <Rules />;
    case 1:
      return <Startup />;
    case 2:
      return <Result info={location.state} />;
    default:
      return <Rules />;
  }
};
