//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import ModalLogin from "../UI/ModalLogin";

import LoginStyle from "../../Style/Login/Login.module.css";
import LoginCard from "./LoginCard";

const LoginPW = ({
  handleSubmit,
  handleChange,
  password,
  check,
  findPw,
  modalOpen,
  closeModal,
}) => {
  return (
    <LoginCard>
      <form onSubmit={handleSubmit} className={LoginStyle.loginForm}>
        <h2 className={LoginStyle.loginText}>로그인(비밀번호)</h2>
        <label className={LoginStyle.loginEmailform}>
          <input
            type="password"
            name="email"
            value={password}
            onChange={handleChange}
            className={LoginStyle.loginTextform}
          />
        </label>
        <div onClick={findPw} className={LoginStyle.loginBottom}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호
          잊어버리셨나요? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {modalOpen && (
            <ModalLogin
              setModalOpen={closeModal}
              modlOpen={modalOpen}
            ></ModalLogin>
          )}
          <button
            type="submit"
            onClick={check}
            className={LoginStyle.loginBtnform}
          >
            >>>
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </form>
    </LoginCard>
  );
};

export default LoginPW;
