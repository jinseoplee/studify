import React from "react";

import LogincardStyle from "../../Style/Login/LoginCard.module.css";

const LoginCard = (props) => {
  return <div className={LogincardStyle.logincard}>{props.children}</div>;
};

export default LoginCard;
