import { createReducer } from '@reduxjs/toolkit';
import { changeLocation, getQuests, getQuest, changeFilter, waitServer } from './actions';
import { MenuItem, QuestFilter } from '../const';
import { State } from '../types';

const initialState: State = {
  currentMenuItem: MenuItem.Home,
  quests: [],
  filter: QuestFilter.All,
  quest: undefined,
  isWaiting: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.currentMenuItem = action.payload;
    })
    .addCase(getQuests, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(getQuest, (state, action) => {
      state.quest = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(waitServer, (state, action) => {
      state.isWaiting = action.payload;
    });
});
