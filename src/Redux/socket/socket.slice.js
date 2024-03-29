import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  socket: { code: 0, data: {} },
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action;
    },
  },
  extraReducers: {},
});
export const { setSocket } = socketSlice.actions;
export const { reducer: socketReducer } = socketSlice;
export default socketReducer;
