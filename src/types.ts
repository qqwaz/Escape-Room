import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { QuestType, QuestLevel, QuestFilter, MenuItem } from './const';

export type State = {
  currentMenuItem: MenuItem,
  quests: Quest[],
  filter: QuestFilter,
  quest?: Quest,
  order?: Order,
  isWaiting: boolean,
}

export type Quest = {
  id: number,
  title: string,
  description: string,
  previewImg: string,
  coverImg: string,
  type: QuestType,
  level: QuestLevel,
  peopleCount: [number, number],
  duration: number,
}

export type Order = {
  name: string,
  peopleCount: number,
  phone: string,
  isLegal: boolean,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export enum ActionType {
  ChangeLocation = 'changeLocation',
  GetQuests = 'getQuests',
  GetQuest = 'getQuest',
  ChangeFilter = 'changeFilter',
  SendOrder = 'sendOrder',
  WaitServer = 'waitServer',
}

