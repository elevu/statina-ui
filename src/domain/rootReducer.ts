import settings from './settings/slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({ settings });

export type RootState = ReturnType<typeof rootReducer>;
