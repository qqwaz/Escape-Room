import { ReactComponent as IconAllQuests } from 'assets/img/icon-all-quests.svg';
import { ReactComponent as IconAdventures } from 'assets/img/icon-adventures.svg';
import { ReactComponent as IconHorrors } from 'assets/img/icon-horrors.svg';
import { ReactComponent as IconMystic } from 'assets/img/icon-mystic.svg';
import { ReactComponent as IconDetective } from 'assets/img/icon-detective.svg';
import { ReactComponent as IconScifi } from 'assets/img/icon-scifi.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './quests-catalog.styled';
import { AppRoute, QuestFilter, QuestFilterTitle, QuestLevelTitle } from 'const';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, fetchQuests } from 'store/actions';
import { getFilter, getFilteredQuests, getIsWaiting } from 'store/selectors';
import { useEffect, SyntheticEvent } from 'react';
import Waiting from 'components/common/waiting/waiting';

const getQuestFilterIcon = (filter: QuestFilter) => {
  switch (filter) {
    case QuestFilter.All: return <IconAllQuests />;
    case QuestFilter.Adventure: return <IconAdventures />;
    case QuestFilter.Horror: return <IconHorrors />;
    case QuestFilter.Mystic: return <IconMystic />;
    case QuestFilter.Detective: return <IconDetective />;
    case QuestFilter.Scifi: return <IconScifi />;
    default: return null;
  }
}

const QuestsCatalog = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const quests = useSelector(getFilteredQuests);
  const isWaiting = useSelector(getIsWaiting);

  const onFilter = (filter: QuestFilter) => (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeFilter(filter));
  };

  useEffect(() => {
    dispatch(fetchQuests());
  }, [dispatch])

  if (isWaiting) {
    return <Waiting />
  }

  return <>
    <S.Tabs>
      {Object.values(QuestFilter).map((x) => (
        <S.TabItem key={x}
          onClick={onFilter(x)}>
          <S.TabBtn isActive={filter === x}>
            {getQuestFilterIcon(x)}
            <S.TabTitle>{QuestFilterTitle[x]}</S.TabTitle>
          </S.TabBtn>
        </S.TabItem>
      ))}
    </S.Tabs>

    <S.QuestsList>
      {quests.map((x) => (
        <S.QuestItem key={x.id}>
          <S.QuestItemLink to={`${AppRoute.Quest}/${x.id}`}>
            <S.Quest>
              <S.QuestImage
                src={`/${x.previewImg}`}
                width="344"
                height="232"
                alt={`квест ${x.title}`}
              />
              <S.QuestContent>
                <S.QuestTitle>{x.title}</S.QuestTitle>
                <S.QuestFeatures>
                  <S.QuestFeatureItem>
                    <IconPerson />
                    {`${x.peopleCount[0]}–${x.peopleCount[1]} чел`}
                  </S.QuestFeatureItem>
                  <S.QuestFeatureItem>
                    <IconPuzzle />
                    {QuestLevelTitle[x.level]}
                  </S.QuestFeatureItem>
                </S.QuestFeatures>
              </S.QuestContent>
            </S.Quest>
          </S.QuestItemLink>
        </S.QuestItem>
      ))}
    </S.QuestsList>
  </>
};

export default QuestsCatalog;
