import { configureStore } from "@reduxjs/toolkit";

import SignupStoreReducer from "./SignupStore";
import tokensaveReducer from "./LoginStore";

const store = configureStore({
  reducer: { codenum: SignupStoreReducer, token: tokensaveReducer },
  //   reducer: counterSlice.reducer,
});

export default store;
