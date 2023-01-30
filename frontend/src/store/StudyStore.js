import { createSlice } from "@reduxjs/toolkit";

const studyList = { userDay: null, studySkill: null };

const studySlice = createSlice({
  name: "selectday",
  initialState: studyList,
  reducers: {
    changeday(state, action) {
      state.userDay = action.payload;
    },
    changeskill(state, action) {
      state.studySkill = action.payload;
    },
  },
});

export const selectdayActions = studySlice.actions;

export default studySlice.reducer;
