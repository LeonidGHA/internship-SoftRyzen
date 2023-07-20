import cn from 'classnames';

import { Button } from 'ui-kit/components/CommonsButtons/Button';

import s from './CastingCard.module.scss';

interface CastingCardProps {
  headNumber: number;
  title: string;
  textContent: string;
  linkContent: string;
  buttonText: string;
  isCardActive: boolean;
  isCardSuccess?: boolean;
  isCardFailed?: boolean;
  subText?: string;
}

export const CastingCard = ({
  headNumber,
  title,
  textContent,
  linkContent,
  buttonText,
  subText,
  isCardActive,
  isCardSuccess,
  isCardFailed,
}: CastingCardProps) => {
  return (
    <li
      className={cn(
        s.item,
        isCardActive && s.itemActive,
        isCardSuccess && s.itemApproved,
        isCardFailed && s.itemFailed
      )}
    >
      <div
        className={cn(
          s.headNumber,
          isCardSuccess && s.headNumberApproved,
          isCardFailed && s.headNumberFailed
        )}
      >
        {headNumber}
      </div>
      <h3
        className={cn(
          s.title,
          isCardSuccess && s.titleApproved,
          isCardFailed && s.titleFailed
        )}
      >
        {title}
      </h3>
      <p className={s.par}>{textContent}</p>

      {!isCardSuccess && !isCardFailed && (
        <Button
          text={buttonText}
          shortVariant
          centered
          link={linkContent}
          isDisabled={!isCardActive}
          moreStyles={s.btn}
        />
      )}

      {isCardActive && (isCardSuccess || isCardFailed) && (
        <p
          className={cn(
            s.subText,
            isCardSuccess && s.subTextApproved,
            isCardFailed && s.subTextFailed
          )}
        >
          {subText}
        </p>
      )}
    </li>
  );
};
