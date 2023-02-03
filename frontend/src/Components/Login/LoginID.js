//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import "./LoginID.css";

// email,
//   isRemember,
//   handleChange,
//   handleSubmit,
//   togglecheck,
const LoginID = (props) => {
  return (
    <LoginCard>
      <form onSubmit={props.handleSubmit} className="idform">
        <h2 className="logintext">로그인</h2>
        <label className="emailform">
          <input
            type="text"
            id="email"
            value={props.email}
            name="email"
            onChange={props.handleChange}
            className="textform"
            placeholder="test@test.com"
          />
        </label>
        <fieldset>
          <input
            type="checkbox"
            id="saveid"
            onChange={props.togglecheck}
            checked={props.isRemember}
            className="checkboxform"
          />
          <label htmlFor="saveid">아이디저장</label>
        </fieldset>
        <div className="loginbottom">
          아이디가 존재하지 않으신가요? &nbsp;
          <Link to="/user/signup" className="text_link">
            회원가입
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" className="btnform">
            다음
          </button>
        </div>
      </form>
    </LoginCard>
  );
};

export default LoginID;
