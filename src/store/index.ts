import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

window.onbeforeunload = () => {
  const { draft, ...userData } = store.getState().user;
  localStorage.setItem('draft', JSON.stringify(draft));
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
