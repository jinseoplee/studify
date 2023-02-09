import { createSlice } from "@reduxjs/toolkit";

const studyList = {
  userDay: [],
  studySkill: [],
  studyCapa: 3,
  studyNum: "",
  studyM: "",
};
// const studyTimeList = { daysList: [] };

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
    changecapa(state, action) {
      state.studyCapa = action.payload;
    },
    changestudynum(state, action) {
      state.studyNum = action.payload;
    },
    changestudyM(state, action) {
      state.studyM = action.payload;
    },
  },
});

export const selectdayActions = studySlice.actions;

export default studySlice.reducer;
