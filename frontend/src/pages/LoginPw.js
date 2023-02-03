import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/LoginStore";
import axios from "axios";
import LoginPW from "../Components/Login/LoginPW";
import swal from "sweetalert";

const LoginPw = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  //처음에 모달창을 꺼놓기 위해 초기값을 false로 줍니다.
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  //이전에 loginId 페이지에서 가져온 이메일 값을 지정해줍니다.
  const useremail = localStorage.getItem("email");
  console.log(useremail);

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
    setPassword(event.target.value);
  };

  //다음 버튼 클릭시 비밀번호가 아이디와 일치하는지 확인해줍니다.
  //LoginID로 부터 ID를 props를 통해 받아와서 해당 ID와 PW가 맞는지 확인시켜주어야함.
  //Map을 통해 Back에서 저장될것같다.
  const check = async (event) => {
    if (password === "") {
      swal("비밀번호를 입력하지 않았습니다.");
      event.preventDefault();
    } else if (password.length < 8) {
      //비밀번호의 길이가 8보다 짧다면?
      swal("비밀번호는 최소 8자 이상입니다.");
      event.preventDefault();
    }
  };

  //비밀번호 찾기를 누르면 Modal창을 열어주기위해서 showModal을 사용합니다.
  const findPw = () => {
    showModal();
  };

  //여기서 axios 통신을 사용하여 back에 아이디가 있는지 확인해줍니다.
  //back에서는 for문으로 찾아주는건가?..
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password);
    console.log(localStorage.getItem("email"));
    try {
      const response = await axios.post(`/api/v1/users/auth/signin`, {
        email: localStorage.getItem("email"),
        password: password,
      });
      console.log(response);
      //백쪽으로 요청을 보냄. 해당 요청이 있다면 user/resetpw페이지로 이동시켜주자.
      //있으면 로컬스토리지에 이름이랑 이메일을 저장해주자
      //그러고 패스워드 재설정 완료시에 로컬스토리지에 저장된 것 삭제.
      localStorage.removeItem("email");
      //리덕스에 토큰저장.
      dispatch(loginActions.saveToken(response.data.token));
      navigate("/dashboard"); //맞다면 대시보드 페이지로 이동시켜주기.
    } catch (err) {
      console.log(err);
      swal("잘못된 비밀번호입니다. 다시 입력해주세요.");
    }
  };

  return (
    <>
      <LoginPW
        password={password}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        check={check}
        findPw={findPw}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default LoginPw;
