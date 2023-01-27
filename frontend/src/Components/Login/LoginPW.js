//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import ModalLogin from "../UI/ModalLogin";

import "./LoginPW.css";

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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="email"
          value={password}
          onChange={handleChange}
        />
        <button type="submit" onClick={check}>
          다음
        </button>
      </form>
      <div onClick={findPw}>비밀번호 잊어버리셨나요?</div>
      {modalOpen && <ModalLogin setModalOpen={closeModal}></ModalLogin>}
    </>
  );
};

export default LoginPW;
