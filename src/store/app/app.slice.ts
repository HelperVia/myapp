import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  connection_token: string | null;
  connection: boolean;
};
const initialState: initialStateType = {
  connection_token: null,
  connection: false,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConnectionToken(state, action) {
      state.connection_token = action.payload;
    },
    setConnection(state, action) {
      state.connection = action.payload;
    },
  },
});

export const { setConnectionToken, setConnection } = appSlice.actions;

export default appSlice.reducer;
