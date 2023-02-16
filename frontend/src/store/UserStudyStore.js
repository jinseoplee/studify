import { createSlice } from "@reduxjs/toolkit";

const UserStudy = {
  studyId: 0,
};
// const studyTimeList = { daysList: [] };

const userstudySlice = createSlice({
  name: "userStudyInfo",
  initialState: UserStudy,
  reducers: {
    changename(state, action) {
      state.studyname = action.payload;
    },
  },
});

export const selectdayActions = userstudySlice.actions;

export default userstudySlice.reducer;
