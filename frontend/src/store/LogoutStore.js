import { createSlice } from "@reduxjs/toolkit";

const initialTokenState = { accesstoken: " " };

const logoutSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {
    deleteToken(state, action) {
      state.accesstoken = action.payload;
      return;
    },
  },
});

export const logoutActions = loginSlice.actions;

export default logoutSlice.reducer;
