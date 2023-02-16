import { createSlice } from "@reduxjs/toolkit";

const InitialUserList = {
  userRegion: " ",
};

const UserSlice = createSlice({
  name: "userinfo",
  initialState: InitialUserList,
  reducers: {
    saveUserRegion(state, action) {
      state.userRegion = action.payload;
    },
    saveUserGeneration(state, action) {
      state.userGeneration = action.payload;
    },
  },
});

export const userChangeActions = UserSlice.actions;

export default UserSlice.reducer;
