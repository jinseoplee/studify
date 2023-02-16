import React from "react";
// import { loginIdpass } from "../utils/api";

import Login from "../../Components/Login/Login";
import TokenRemove from "../../Components/TokenCheck/TokenRemove";

const LoginPage = () => {
  return (
    <>
      <TokenRemove />
      <Login />
    </>
  );
};

export default LoginPage;
