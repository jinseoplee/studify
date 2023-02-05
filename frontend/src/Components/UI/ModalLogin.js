import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ModalContainer from "./ModalContainer";
import Modalstyle from "../../Style/UI/ModalLogin.module.css";

const LoginModal = (props) => {
  const navigate = useNavigate();
  //모달창 닫기.

  const modalmodal = () => {
    props.setModal();
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  //modal창을 useRef로 취득.
  const modalRef = useRef();

  //모달창 바깥클릭시 창을 닫히게 만들어준다.
  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setModal();
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
    if (userInfo.username === "") {
      alert("이름을 입력하지 않았습니다.");
      event.preventDefault();
    } else if (userInfo.email === "") {
      alert("이메일을 입력하지 않았습니다.");
      event.preventDefault();
    } else {
      //채워져있으면? 아이디와 이메일 비교해서 있으면 비밀번호 재설정페이지로 이동.
      event.preventDefault();
      try {
        const response = await axios.get(`/api/v1/users/${userInfo.email}`, {
          // name: userInfo.username,
          // email: userInfo.email,
        });
        console.log(response);
        //백쪽으로 요청을 보냄. 해당 요청이 있다면 user/resetpw페이지로 이동시켜주자.
        //있으면 로컬스토리지에 이름이랑 이메일을 저장해주자
        //그러고 패스워드 재설정 완료시에 로컬스토리지에 저장된 것 삭제.
        localStorage.setItem("findname", userInfo.username);
        localStorage.setItem("findemail", userInfo.email);
        navigate("/user/resetpw");
      } catch (err) {
        console.log(err);
        swal("잘못된 회원정보입니다. 다시 입력해주세요.");
      }
    }
  };

  return (
    <ModalContainer>
      <div className={Modalstyle.modalloginFullScreen}>
        <div ref={modalRef} className={Modalstyle.modalloginContainer}>
          <button className={Modalstyle.modalloginClose} onClick={modalmodal}>
            X
          </button>
          <div className={Modalstyle.modalloginTitle}>비밀번호 찾기 모달창</div>
          <form>
            <div className={Modalstyle.modallogininputspaceName}>
              이름 :{" "}
              <input
                name="username"
                className={Modalstyle.modalloginInputspace}
                type="text"
                onChange={change}
                value={userInfo.username}
              ></input>
            </div>
            <div className={Modalstyle.modalloginInputspaceEmail}>
              이메일 :{" "}
              <input
                name="email"
                className={Modalstyle.modalloginInputspace}
                type="text"
                onChange={change}
                value={userInfo.email}
              ></input>
            </div>
            <div className={Modalstyle.modalloginLoginButton}>
              <button type="submit" onClick={check}>
                찾기
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default LoginModal;
