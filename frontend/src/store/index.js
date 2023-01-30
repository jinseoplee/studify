import { configureStore } from "@reduxjs/toolkit";

import SignupStoreReducer from "./SignupStore";
import tokensaveReducer from "./LoginStore";
import studyStoreReducer from "./StudyStore";

const store = configureStore({
  reducer: {
    codenum: SignupStoreReducer,
    token: tokensaveReducer,
    selectday: studyStoreReducer,
  },

  //   reducer: counterSlice.reducer,
});

export default store;
