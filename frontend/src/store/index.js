import { configureStore } from "@reduxjs/toolkit";

import SignupStoreReducer from "./SignupStore";
import tokensaveReducer from "./LoginStore";
import studyStoreReducer from "./StudyStore";
import userStoreReducer from "./UserStore";
import userStudyReducer from "./UserStudyStore";
import userSelectStudyReducer from "./StudyRounge";

const store = configureStore({
  reducer: {
    codenum: SignupStoreReducer,
    token: tokensaveReducer,
    selectday: studyStoreReducer,
    userinfo: userStoreReducer,
    userStudyInfo: userStudyReducer,
    selectStudy: userSelectStudyReducer,
  },

  //   reducer: counterSlice.reducer,
});

export default store;
