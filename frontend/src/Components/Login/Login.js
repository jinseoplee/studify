//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { loginActions } from "../../store/LoginStore";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import ModalLogin from "../UI/ModalLogin";
import LoginStyle from "../../Style/Login/Login.module.css";
import logo from "../../assets/image/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  //쿠키 이름이 useremail입니다.
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  //처음에 모달창을 꺼놓기 위해 초기값을 false로 줍니다.
  const [modalOpen, setModalOpen] = useState(false);

  //아이디 저장 체크박스 유무를 알려줍니다.
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["useremail"]);
  const navigate = useNavigate();

  //페이지 최초 랜더링 될때
  useEffect(() => {
    //만약 쿠키 값이 있다면 체크박스를 true로 만들어주고 id부분에 값 세팅
    if (cookies.useremail !== undefined) {
      //값이 있다면?
      setEmail(cookies.useremail); //이메일의 값을 쿠키에 있는 값으로 넣어주고
      setIsRemember(true); //체크박스를 true로 만들어줍니다.
    }
  }, [cookies.useremail]);

  const handleChangeId = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePw = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/v1/users/auth/signin`, {
        email: email,
        password: password,
      });
      //axios post요청으로 보내야합니다.
      console.log(response);
      if (isRemember) {
        setCookie("useremail", email);
      } else {
        removeCookie("useremail");
      }

      console.log(response);
      //현재 리덕스에 토큰을 저장합니다.
      dispatch(loginActions.saveToken(response.data.token));
      navigate("/mainpage");
    } catch (err) {
      console.log(err);
      swal("아이디가 잘못 입력 되었습니다. 다시입력해주세요");
    }
  };

  //모달창을 열어주는 함수입니다.
  const showModal = () => {
    setModalOpen(true);
  };

  //모달창을 닫아주는 함수입니다.
  const closeModal = () => {
    setModalOpen(false);
  };

  //체크박스가 바뀌는 것을 확인해줍니다.
  const togglecheck = (event) => {
    setIsRemember(event.target.checked); //체크박스를 이벤트 부분으로 확인.
  };
  const findPw = () => {
    showModal();
  };

  const notFindPw = () => {
    closeModal();
  };
  return (
    <div className={LoginStyle.maincontainer}>
      <LoginCard>
        <form onSubmit={handleSubmit} className={LoginStyle.loginForm}>
          <div className={LoginStyle.loginBox}>
            <img
              src={logo}
              alt="studify"
              style={{
                width: "150px",
                marginLeft: "110px",
                marginBottom: "30px",
                marginTop: "-20px",
              }}
            ></img>
            <h2 className={LoginStyle.loginText}>로그인</h2>
            <div className={LoginStyle.loginEmailform}>
              <input
                type="text"
                id="email"
                value={email}
                name="email"
                onChange={handleChangeId}
                className={LoginStyle.loginTextform}
                placeholder="test@test.com"
              />
            </div>
            <label className={LoginStyle.loginEmailform}>
              <input
                type="password"
                name="email"
                value={password}
                onChange={handleChangePw}
                className={LoginStyle.loginTextform}
                placeholder="비밀번호를 입력해주세요"
              />
            </label>
            <br />
            <br />
            <fieldset>
              <input
                type="checkbox"
                id="saveid"
                onChange={togglecheck}
                checked={isRemember}
                className={LoginStyle.loginCheckboxform}
              />
              <label htmlFor="saveid">아이디저장</label>
            </fieldset>
          </div>
          <div className={LoginStyle.loginBottom}>
            <Link to="/user/signup" className={LoginStyle.loginText_link}>
              회원가입
            </Link>
            <div onClick={findPw} className={LoginStyle.pwFind}>
              비밀번호 찾기
            </div>
            {modalOpen && <ModalLogin setModal={notFindPw}></ModalLogin>}
            <button type="submit" className={LoginStyle.loginBtnform}>
              {">>>"}
            </button>
          </div>
        </form>
      </LoginCard>
    </div>
  );
};

export default Login;
