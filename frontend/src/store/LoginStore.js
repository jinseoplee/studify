import { createSlice } from "@reduxjs/toolkit";

const initialTokenState = { accesstoken: " ", useremail: " " };

const loginSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {
    saveToken(state, action) {
      state.accesstoken = action.payload;
    },
    saveUserEmail(state, action) {
      state.useremail = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
