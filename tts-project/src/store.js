import { configureStore } from '@reduxjs/toolkit';
import statusSliceReducer from './features/statusSlice';
import usersSliceReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    status: statusSliceReducer,
    users: usersSliceReducer,
  },
});
