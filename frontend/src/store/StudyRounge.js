import { createSlice } from "@reduxjs/toolkit";

const studyRoungeList = { skillList: [], studySelect: [] };

const studyRoungeSlice = createSlice({
  name: "selectStudy",
  initialState: studyRoungeList,
  reducers: {
    changeskillList(state, action) {
      state.skillList = action.payload;
    },
    changestudySelect(state, action) {
      state.studySelect = action.payload;
    },
  },
});

export const selectstudyActions = studyRoungeSlice.actions;

export default studyRoungeSlice.reducer;
