import React from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/LoginStore";
import { userChangeActions } from "../../store/UserStore";

const TokenRemove = () => {
  const dispatch = useDispatch();
  dispatch(loginActions.saveToken(" "));
  dispatch(userChangeActions.saveUserRegion());
  return <></>;
};

export default TokenRemove;
