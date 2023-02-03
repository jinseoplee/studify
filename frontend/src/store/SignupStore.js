import { createSlice } from "@reduxjs/toolkit";

const initialCodeState = { userCode: " " };

const signupSlice = createSlice({
  name: "codenum",
  initialState: initialCodeState,
  reducers: {
    changecode(state, action) {
      state.userCode = action.payload;
    },
  },
});

export const codenumActions = signupSlice.actions;

export default signupSlice.reducer;
