import { createSlice } from "@reduxjs/toolkit";

const InitialUserList = {
  user: null,
  userTime: [
    { day: "Monday", time: 129 },
    { day: "Tuesday", time: 61 },
    { day: "Wednesday", time: 55 },
    { day: "Thursday", time: 78 },
    { day: "Friday", time: 71 },
    { day: "Saturday", time: 56 },
    { day: "Sunday", time: 67 },
  ],
  userAverage: "",
  userTodayTime: "",
};

const UserSlice = createSlice({
  name: "userinfo",
  initialState: InitialUserList,
  reducers: {
    userchange(state, action) {
      state.user = action.payload;
    },
    changeUserDay(state, action) {
      state.userToday = action.payload;
    },
  },
});

export const userChangeActions = UserSlice.actions;

export default UserSlice.reducer;
