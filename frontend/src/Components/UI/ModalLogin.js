import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ModalContainer from "./ModalContainer";
import "./ModalLogin.module.css";

const LoginModal = (props) => {
  //모달창 닫기.
  const closeModal = () => {
    console.log("모달창 닫기");
    console.log(props);
    props.setModalOpen(false);
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const { username, email } = userInfo;

  //modal창을 useRef로 취득.
  const modalRef = useRef();

  //모달창 바깥클릭시 창을 닫히게 만들어준다.
  useEffect(() => {
    const handler = (event) => {
      console.log(props);
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModalOpen(false);
        console.log(props);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const change = (event) => {
    const { value, name } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  //check버튼을 누를때 이때 있는 아이디와 패스워드가
  //DB에 있는 정보와 일치한다면 Modal창에 있는 로그인을 로그아웃으로 변경 <
  //만약 정보가 다르다면? 로그인 실패로 만들고 모달창 그대로 유지.
  const check = async (event) => {
    if (username === "") {
      alert("아이디를 입력하지 않았습니다.");
      event.preventDefault();
    } else if (email === "") {
      alert("비밀번호를 입력하지 않았습니다.");
      event.preventDefault();
    } else {
      //채워져있으면? 아이디와 이메일 비교해서 있으면 비밀번호 재설정페이지로 이동.
      try {
        const response = await axios.post(`api/v1/users/pwfind/`, {});
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ModalContainer>
      <div ref={modalRef} className="container">
        <button className="close" onClick={closeModal}>
          X
        </button>
        <div className="title">비밀번호 찾기 모달창</div>
        <form>
          <div className="inputspaceName">
            이름 :{" "}
            <input
              name="username"
              className="inputspace"
              type="text"
              onChange={change}
              value={username}
            ></input>
          </div>
          <div className="inputspaceEmail">
            이메일 :{" "}
            <input
              name="email"
              className="inputspace"
              type="text"
              onChange={change}
              value={email}
            ></input>
          </div>
          <div className="loginButton">
            <button type="submit" onClick={check}>
              찾기
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default LoginModal;
