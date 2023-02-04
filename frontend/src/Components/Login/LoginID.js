//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import LoginStyle from "../../Style/Login/Login.module.css";

const LoginID = (props) => {
  return (
    <LoginCard>
      <form onSubmit={props.handleSubmit} className={LoginStyle.loginForm}>
        <h2 className={LoginStyle.loginText}>로그인(이메일)</h2>
        <label className={LoginStyle.loginEmailform}>
          <input
            type="text"
            id="email"
            value={props.email}
            name="email"
            onChange={props.handleChange}
            className={LoginStyle.loginTextform}
            placeholder="test@test.com"
          />
        </label>
        <fieldset>
          <input
            type="checkbox"
            id="saveid"
            onChange={props.togglecheck}
            checked={props.isRemember}
            className={LoginStyle.loginCheckboxform}
          />
          <label htmlFor="saveid">아이디저장</label>
        </fieldset>
        <div className={LoginStyle.loginBottom}>
          아이디가 존재하지 않으신가요? &nbsp;
          <Link to="/user/signup" className={LoginStyle.loginText_link}>
            회원가입
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" className={LoginStyle.loginBtnform}>
            >>>
          </button>
        </div>
      </form>
    </LoginCard>
  );
};

export default LoginID;
