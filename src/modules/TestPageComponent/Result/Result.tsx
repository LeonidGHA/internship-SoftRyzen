import { FC } from 'react';
import cn from 'classnames';

import { ROUTES } from 'routes/routes.const';
import { ICONS } from 'ui-kit/icons';
import { Block } from 'constants/types';

import { Button } from 'ui-kit/components/CommonsButtons/Button';
import { ProgressList } from 'ui-kit/components/ProgressList';

import testAccomplishment from 'data/testAccomplishment.json';
import s from './Result.module.scss';
import { useGetTestDataQuery } from '../../../redux/testing/testingSlice';
import useAppSelector from 'hooks/useAppSelector';

interface ResultProps {
  info: {
    testsLength: number;
    points: number;
    blockResults: Block[];
  };
}

export const Result: FC<ResultProps> = ({ info }) => {
  const { testsLength, points, blockResults } = info;
  const userDirection = useAppSelector((state) => state.auth.user.direction);
  const { data, isLoading } = useGetTestDataQuery(userDirection);

  return (
    data &&
    !isLoading && (
      <section className={s.testAccomplishment}>
        <div className={cn('mainContainer', s.accomplishmentContainer)}>
          <div className={s.accomplishmentMessage}>
            <div className={s.accomplishmentTextWrapper}>
              {testAccomplishment.message.positive.map((textItem, index) => (
                <p key={index}>{textItem}</p>
              ))}
            </div>

            {(data[0].passingScore / 100) * testsLength < points ? (
              <Button
                longestVariant
                link={ROUTES.TASK}
                text={testAccomplishment.buttonLinkText}
                moreStyles={s.finishButton}
              />
            ) : null}
          </div>

          <div className={s.testAccomplishmentInfo}>
            <div className={cn(s.resultInfoWrapper, s.correctAnswers)}>
              <p className={s.resultInfoTitle}>{testAccomplishment.correctAnswersText}</p>
              <p className={s.resultInfoCount}>{`${points}/${testsLength}`}</p>
            </div>

            <div className={s.progressWrapper}>
              <ProgressList progressData={blockResults} />
            </div>

            {(data[0].passingScore / 100) * testsLength > points ? (
              <div className={cn(s.accomplishmentPassBox, s.failed)}>
                <ICONS.LIKE className={cn(s.accomplishmentPassIcon, s.iconFailed)} />
                <p className={cn(s.accomplishmentPassText, s.textFailed)}>
                  {testAccomplishment.resultText.negative}
                </p>
              </div>
            ) : (
              <div className={cn(s.accomplishmentPassBox, s.passed)}>
                <ICONS.LIKE className={s.accomplishmentPassIcon} />
                <p className={s.accomplishmentPassText}>
                  {testAccomplishment.resultText.positive}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
};
