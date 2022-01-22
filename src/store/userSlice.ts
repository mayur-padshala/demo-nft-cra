// eslint-ignore-file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  draft?: any;
  username?: string;
  fullName?: string;
  type?: string;
  accountID?: string;
}

const draft = JSON.parse(localStorage.getItem('draft') ?? '{}');
const userData = JSON.parse(localStorage.getItem('userData') ?? 'null');

const initialState: UserState = {
  draft,
  username: userData?.username,
  fullName: userData?.fullName,
  type: userData?.type,
  accountID: userData?.accountID,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<UserState>) => {
      state.accountID = action.payload.accountID;
      state.username = action.payload.username;
      state.fullName = action.payload.fullName;
      state.type = action.payload.type;
    },
    saveToDraft: (state, action: PayloadAction<any>) => {
      state.draft = {
        ...state.draft,
        ...action.payload,
      };
    },
    deleteDraft: (state) => {
      state.draft = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, saveToDraft, deleteDraft } = userSlice.actions;

export default userSlice.reducer;
