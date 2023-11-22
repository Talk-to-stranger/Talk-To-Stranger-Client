import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  microphone: false,
  mute: false,
  username: 'user#',
  online: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setMicrophone: (state) => {
      state.microphone = !state.microphone;
    },
    setMute: (state) => {
      state.mute = !state.mute;
    },
    setOnline: (state) => {
      state.online = !state.online;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setMicrophone, setMute, setOnline, setUsername } = statusSlice.actions;

export default statusSlice.reducer;
