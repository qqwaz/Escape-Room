import { createBrowserHistory } from 'history';
import { createAction } from '@reduxjs/toolkit';
import { ActionType, Order, Quest, ThunkActionResult } from '../types';
import { ApiMessage, APIRoute, AppRoute, MenuItem, QuestFilter } from '../const';
import { toast } from 'react-toastify';

const history = createBrowserHistory();

export const changeLocation = createAction(
  ActionType.ChangeLocation,
  (location: MenuItem) => ({
    payload: location,
  }),
);

export const getQuests = createAction(
  ActionType.GetQuests,
  (quests: Quest[]) => ({
    payload: quests,
  }),
);

export const getQuest = createAction(
  ActionType.GetQuest,
  (quest: Quest | undefined) => ({
    payload: quest,
  }),
);

export const changeFilter = createAction(
  ActionType.ChangeFilter,
  (filter: QuestFilter) => ({
    payload: filter,
  }),
);

export const waitServer = createAction(
  ActionType.WaitServer,
  (status: boolean) => ({
    payload: status,
  }),
);

export const fetchQuests = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(waitServer(true));
      const { data } = await api.get<Quest[]>(APIRoute.Quests);
      dispatch(getQuests(data));
    } catch {
      dispatch(getQuests([]));
      toast.error(ApiMessage.GetQuestsError)
    } finally {
      dispatch(waitServer(false));
    }
  };

export const fetchQuest = (id: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(waitServer(true));
      const { data }  = await api.get<Quest>(APIRoute.Quest.replace(':quest_id', id));
      dispatch(getQuest(data));
    } catch {
      dispatch(getQuest(undefined));
      history.push(AppRoute.NotFound);
      toast.error(ApiMessage.GetQuestError)
    } finally {
      dispatch(waitServer(false));
    }
  };

export const postOrder = (order: Order, onSuccess: () => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post(APIRoute.Order, order);
      onSuccess();
      toast.success(ApiMessage.PostOrderSuccess)
    } catch(e) {
      toast.error(ApiMessage.PostOrderError)
      throw(e);
    } finally {
    }
  };


  // async (dispatch, _getState, api) => {
  //   try {
  //     setIsSending(true);
  //     await api.post(APIRoute.Order, {name, peopleCount, phone, isLegal});
  //     onClose(false);
  //   } catch (error) {
  //     setIsSending(false);
  //     throw (error);
  //   }
