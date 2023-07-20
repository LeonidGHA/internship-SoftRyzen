import { CastingCard } from 'ui-kit/components/cards/CastingCard';

import useAppSelector from 'hooks/useAppSelector';
import { progressStatus } from '../../../redux/progressStatus/progressStatusSelectors';

import defineCastingCardState from 'utils/defineCastingCardState';
import { CastingCardData } from 'constants/types';

interface CastingCardsProps {
  cardsContent: CastingCardData[];
}

export const CastingCards = ({ cardsContent }: CastingCardsProps) => {
  const status = useAppSelector(progressStatus);

  return cardsContent.map(
    ({ key, title, textContent, linkContent, buttonText, subText }, index) => {
      const currentCardId = key;
      const prevCardId = !index ? currentCardId : cardsContent[index - 1].key;

      const isCurrentCardActive = !index
        ? status[currentCardId].isActive
        : status[prevCardId].isSuccess && !status[prevCardId].isFailed;

      const isCurrentCardFailed = status[key].isFailed;
      const isCurrentCardSuccessed = status[key].isSuccess;

      const cardCurrentState = defineCastingCardState(
        isCurrentCardActive,
        isCurrentCardSuccessed,
        isCurrentCardFailed
      );

      return (
        <CastingCard
          key={key}
          headNumber={index + 1}
          title={title}
          textContent={textContent[cardCurrentState]}
          linkContent={linkContent}
          buttonText={buttonText}
          isCardActive={isCurrentCardActive}
          isCardFailed={isCurrentCardFailed}
          isCardSuccess={isCurrentCardSuccessed}
          subText={subText}
        />
      );
    }
  );
};
