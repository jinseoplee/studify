//아이디를 확인해주는 컴포넌트입니다.
import React, { useState } from "react";
import LoginModal from "./LoginModal";

import "./LoginPW.css";

const LoginPW = () => {
  const [loginInfo, setValues] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  //모달창을 열어주는 함수입니다.
  const showModal = () => {
    setModalOpen(true);
  };

  //모달창을 닫아주는 함수입니다.
  const closeModal = () => {
    setModalOpen(false);
  };

  //비밀번호가 바뀔때마다 확인해주는 함수.
  const handleChange = (event) => {
    setValues({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  //다음 버튼 클릭시 비밀번호가 아이디와 일치하는지 확인해줍니다.
  //LoginID로 부터 ID를 props를 통해 받아와서 해당 ID와 PW가 맞는지 확인시켜주어야함.
  //Map을 통해 Back에서 저장될것같다.
  const check = (event) => {
    if (loginInfo.Pw === "") {
      alert("비밀번호를 입력하지 않았습니다.");
      event.preventDefault();
    } else {
    }
    //만약 비밀번호도 일치할시에 Navigate를 이용하여 대시보드로 이동시켜줄것.
  };

  const findPw = () => {
    showModal();
  };
  //여기서 axios 통신을 사용하여 back에 아이디가 있는지 확인해줍니다.
  //back에서는 for문으로 찾아주는건가?..
  const handleSubmit = (event) => {};

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="email"
          value={loginInfo.id}
          onChange={handleChange}
        />
        <button type="submit" onClick={check}>
          다음
        </button>
      </form>
      <div onClick={findPw}>
        비밀번호 잊어버리셨나요?
        {modalOpen && <LoginModal setModalOpen={closeModal}></LoginModal>}
      </div>
    </React.Fragment>
  );
};

export default LoginPW;
