import { createSlice } from "@reduxjs/toolkit";

const initialTokenState = { accesstoken: " ", useremail: " ", name: " " };

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
    saveName(state, action) {
      state.name = action.payload;
    }
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
