import { configureStore } from '@reduxjs/toolkit';
import statusSliceReducer from './features/statusSlice';

export const store = configureStore({
  reducer: {
    status: statusSliceReducer,
  },
});
