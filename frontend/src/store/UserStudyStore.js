import { createSlice } from "@reduxjs/toolkit";

const UserStudy = {
  studyId: 0,
  studyname: "더미데이터 스터디",
  studyimg:
    "https://cdn.pixabay.com/photo/2020/06/18/09/10/city-5312660_960_720.jpg",
  studycapa: 6,
  days: ["월", "화", "수"],
  skills: ["Python", "Vue"],
  description: "안녕하세요 이 데이터는 스터디 소개글입니다",
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
