import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import session from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import SignupStoreSlice from "./SignupStore";
import tokensaveSlice from "./LoginStore";
import studyStoreSlice from "./StudyStore";
import userStoreSlice from "./UserStore";
import userStudySlice from "./UserStudyStore";
import userSelectStudySlice from "./StudyRounge";

const reducers = combineReducers({
  codenum: SignupStoreSlice,
  token: tokensaveSlice,
  selectday: studyStoreSlice,
  userinfo: userStoreSlice,
  userStudyInfo: userStudySlice,
  selectStudy: userSelectStudySlice,
});

const persistConfig = {
  key: "root",
  storage: session,
  whitelist: ["codenum", "token"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
