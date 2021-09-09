import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, GitHubUserInfo, UserInfo } from './types';

const userInitialState = {
  googleId: null,
  imageUrl: null,
  email: null,
  givenName: null,
};

const gitHubUserInitialState = {
  avatar_url: null,
  login: null,
};

export const initialState = {
  user: userInitialState,
  gitHubUser: gitHubUserInitialState,
  googleToken: null,
  gitHubToken: null,
  analyses: [],
} as AppState;

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    resetUserInfo(state) {
      state.user = initialState.user;
    },
    setGoogleToken(state, action: PayloadAction<any>) {
      state.googleToken = action.payload;
    },
    resetGoogleToken(state) {
      state.googleToken = initialState.googleToken;
    },
    setGitHubUserInfo(state, action: PayloadAction<GitHubUserInfo>) {
      state.gitHubUser = action.payload;
    },
    setGitHubToken(state, action: PayloadAction<any>) {
      state.gitHubToken = action.payload;
    },
    setAnalyses(state, action: PayloadAction<any[]>) {
      state.analyses = action.payload;
    },
    resetAnalyses(state) {
      state.analyses = initialState.analyses;
    },
  },
});

export const {
  setUserInfo,
  resetUserInfo,
  setAnalyses,
  resetAnalyses,
  setGoogleToken,
  resetGoogleToken,
  setGitHubUserInfo,
  setGitHubToken,
} = settingsSlice.actions;
export default settingsSlice.reducer;
