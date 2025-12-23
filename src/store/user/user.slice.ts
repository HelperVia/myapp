import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setAccount } = userSlice.actions;
export default userSlice.reducer;
