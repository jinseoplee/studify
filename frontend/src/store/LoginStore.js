import { createSlice } from "@reduxjs/toolkit";

const initialTokenState = { accesstoken: " " };

const loginSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {
    saveToken(state, action) {
      state.accesstoken = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
