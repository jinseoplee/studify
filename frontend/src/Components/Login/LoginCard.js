import React from "react";

import "./LoginCard.css";

const LoginCard = (props) => {
  return <div className="logincard">{props.children}</div>;
};

export default LoginCard;
