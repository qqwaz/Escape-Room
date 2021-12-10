import { useState, useEffect } from 'react';
import { MainLayout } from 'components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import { useSelector, useDispatch } from 'react-redux';
import { getIsWaiting, getQuest } from 'store/selectors';
import { useParams } from 'react-router';
import { QuestFilterTitle, QuestLevelTitle, QuestType } from 'const';
import { fetchQuest } from 'store/actions';
import Waiting from 'components/common/waiting/waiting';

const DetailedQuest = () => {
  const dispatch = useDispatch();
  const quest = useSelector(getQuest);
  const isWaiting = useSelector(getIsWaiting);
  const { id } = useParams<{id: string}>();

  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchQuest(id));
  }, [id, dispatch]);

  if (isWaiting) {
    return (
      <MainLayout>
        <Waiting />
      </MainLayout>
    )
  }

  if (!quest) {
    return null;
  }

  const onBookingBtnClick = () => {
    setIsBookingModalOpened(true);
  };

  const onBookingModalClose = () => {
    setIsBookingModalOpened(false);
  };


  return (
    <MainLayout>
      <S.Main>
        <S.PageImage
          src={`/${quest.coverImg || ''}`}
          alt={`Квест ${quest.title}`}
          width="1366"
          height="768"
        />
        <S.PageContentWrapper>
          <S.PageHeading>
            <S.PageTitle>{quest.title}</S.PageTitle>
            <S.PageSubtitle>{QuestFilterTitle[quest.type as unknown as QuestType]}</S.PageSubtitle>
          </S.PageHeading>

          <S.PageDescription>
            <S.Features>
              <S.FeaturesItem>
                <IconClock width="20" height="20" />
                <S.FeatureTitle>{`${quest.duration} мин`}</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPerson width="19" height="24" />
                <S.FeatureTitle>{`${quest.peopleCount[0]}–${quest.peopleCount[1]} чел`}</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPuzzle width="24" height="24" />
                <S.FeatureTitle>{QuestLevelTitle[quest.level]}</S.FeatureTitle>
              </S.FeaturesItem>
            </S.Features>

            <S.QuestDescription>
              {quest.description}
            </S.QuestDescription>

            <S.QuestBookingBtn onClick={onBookingBtnClick}>
              Забронировать
            </S.QuestBookingBtn>
          </S.PageDescription>
        </S.PageContentWrapper>

        {isBookingModalOpened && <BookingModal onClose={onBookingModalClose} peopleCount={quest.peopleCount} />}
      </S.Main>
    </MainLayout>
  );
};

export default DetailedQuest;
