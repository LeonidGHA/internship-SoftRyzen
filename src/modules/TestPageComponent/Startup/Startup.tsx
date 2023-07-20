import { FC, useState } from 'react';

import { ROUTES } from 'routes/routes.const';
import useAppDispatch from 'hooks/useAppDispatch';
import { decrementPage } from '../../../redux/testing/testingPageSlice';

import { Title } from 'ui-kit/components/typography/Title';
import { Button } from 'ui-kit/components/CommonsButtons/Button';
import { TestInfoList } from './TestInfoList';
import { ProgressList } from 'ui-kit/components/ProgressList';

import { ICONS } from 'ui-kit/icons';
import testStartup from 'data/testStartup.json';
import s from './Startup.module.scss';
import { useCurrentWidth } from 'hooks/useCurrentWidth';
import { useGetTestDataQuery } from '../../../redux/testing/testingSlice';
import { TypeQuestionBlocks } from 'constants/types';
import useAppSelector from 'hooks/useAppSelector';

const transformBlock = (obj: TypeQuestionBlocks, passingScore: number) => {
  const calc = (score = 0) => {
    return Math.round((passingScore * score) / 100);
  };

  return [
    {
      title: 'React',
      points: calc(obj.react),
      AllQuestion: obj.react ?? 0,
    },
    {
      title: 'JS',
      points: calc(obj.javascript),
      AllQuestion: obj.javascript ?? 0,
    },
    { title: 'CSS', points: calc(obj.css), AllQuestion: obj.css ?? 0 },
    { title: 'HTML', points: calc(obj.html), AllQuestion: obj.html ?? 0 },
    { title: 'PM', points: calc(obj.pm), AllQuestion: obj.pm ?? 0 },
    { title: 'design', points: calc(obj.design), AllQuestion: obj.design ?? 0 },
  ];
};

export const Startup: FC = () => {
  const [isDropdownOpened, setDropdownOpening] = useState<boolean>(false);
  const userDirection = useAppSelector((state) => state.auth.user.direction);

  const { data } = useGetTestDataQuery(userDirection);

  const dispatch = useAppDispatch();

  const handleClick = () => setDropdownOpening((state: boolean): boolean => !state);

  const handleBackwardsClick = () => dispatch(decrementPage());

  const windowWidth = useCurrentWidth();

  return (
    <>
      {data && (
        <section className={s.testStartup}>
          <div className="mainContainer">
            <button type="button" className={s.testLink} onClick={handleBackwardsClick}>
              <ICONS.ARROW_LEFT />
              {testStartup.returnLink}
            </button>

            <div className={s.testWrapper}>
              <Title Tag="h1">{testStartup.title}</Title>
              <TestInfoList onDropdownClick={handleClick} data={data[0]} />

              {isDropdownOpened ? (
                <div className={s.progressListWrapper}>
                  <ProgressList
                    progressData={transformBlock(
                      data[0].questionBlocks,
                      data[0].passingScore
                    )}
                    // progressData={testStartup.blockResults}
                    isStartup
                  />
                </div>
              ) : null}

              <Button
                text={testStartup.buttonLinkText}
                link={ROUTES.TESTING}
                icon
                centered
                mainPageSubmitVariant
                moreStyles={s.testButtonLink}
                isDisabled={windowWidth < 1024}
              />
            </div>
            {windowWidth < 1024 && (
              <p className={s.notificationMessage}>
                Для старту тесту перейдіть в десктопну версію
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};
