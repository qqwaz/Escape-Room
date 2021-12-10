import { QuestFilter, QuestType } from '../const';
import { State } from '../types';

export const getMenuItem = (state: State) => state.currentMenuItem;
export const getFilteredQuests = (state: State) => state.quests
  .filter((quest) => state.filter === QuestFilter.All || state.filter as unknown as QuestType === quest.type);
export const getQuest = (state: State) => state.quest;
export const getFilter = (state: State) => state.filter;
export const getIsWaiting = (state: State) => state.isWaiting;
