//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import LoginidStyle from "../../Style/Login/LoginID.module.css";

const LoginID = (props) => {
  return (
    <LoginCard>
      <form
        onSubmit={props.handleSubmit}
        className={LoginidStyle.loginidIdform}
      >
        <h2 className={LoginidStyle.loginidText}>로그인</h2>
        <label className={LoginidStyle.loginidEmailform}>
          <input
            type="text"
            id="email"
            value={props.email}
            name="email"
            onChange={props.handleChange}
            className={LoginidStyle.loginidTextform}
            placeholder="test@test.com"
          />
        </label>
        <fieldset>
          <input
            type="checkbox"
            id="saveid"
            onChange={props.togglecheck}
            checked={props.isRemember}
            className={LoginidStyle.loginidCheckboxform}
          />
          <label htmlFor="saveid">아이디저장</label>
        </fieldset>
        <div className={LoginidStyle.loginidBottom}>
          아이디가 존재하지 않으신가요? &nbsp;
          <Link to="/user/signup" className={LoginidStyle.loginidText_link}>
            회원가입
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" className={LoginidStyle.loginidBtnform}>
            다음
          </button>
        </div>
      </form>
    </LoginCard>
  );
};

export default LoginID;
