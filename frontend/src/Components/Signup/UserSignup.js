import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import logo from "../../assets/image/logo.png";
import SignupStyle from "../../Style/Signup/SignupForm.module.css";

const UserSignup = () => {
  const codenum = useSelector((state) => state.codenum.userCode);
  const origincode = window.location.pathname;
  console.log(origincode);
  const codd = origincode.slice(13);
  useEffect(() => {
    console.log("보내기 준비");
    console.log(codd);
    axios
      .post("/api/v1/users/auth/signup", {
        code: codd,
      })
      .then((res) => {
        console.log(res);
        console.log(codenum);
      })
      .catch((err) => {
        console.log(err);
        console.log(codenum);
      });
  });
  return (
    <div className={SignupStyle.userSignupPage}>
      <img src={logo} alt="logo"></img>
      <p>메일 인증을 확인했습니다</p>
    </div>
  );
};

export default UserSignup;
