import { useState } from "react";
// import { Navigate } from "react-router-dom";
import axios from "axios";

import ModalSignup from "../UI/ModalSignup";
import logo from "./logo.png";
import dummy from "./MailForm.JSON";
import "./SignupForm.css";

const SignupForm = () => {
  //이메일, 비밀번호, 비밀번호 확인
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [Name, setName] = useState("");

  //오류 메시지 상태저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [checkJson, setCheckJson] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // const onEmailHandler = (event) => {
  //   setEmail(event.currentTarget.value);
  // };
  // const onPasswordHandler = (event) => {
  //   setPassword(event.currentTarget.value);
  // };
  // const onPasswordCheckHandler = (event) => {
  //   setPasswordCheck(event.currentTarget.value);
  // };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const OnSubmitHandler = async (event) => {
    // const [data, setData] = useState("");
    event.preventDefault();
    const mailjson = dummy;

    try {
      const response = await axios.post(
        "http://192.168.31.27:8080/api/v1/users/signup",
        {
          email: Email,
          password: Password,
          name: Name,
        }
      );
      // setData(response.data);

      console.log(response);
      // .then((res) => {
      //   console.log("response:", res);
      // if (res.status === 200) {
      // router.push('#')
      // console.log(res);
      // });
    } catch (err) {
      console.log(mailjson);
      console.error(err);
    }
  };
  const onChangeEmail = (event) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
      setIsEmail(true);
    }
  };
  const onChangePassword = (event) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "영문자+숫자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordCheck = (event) => {
    const passwordCheckCurrent = event.target.value;
    setPasswordCheck(passwordCheckCurrent);
    if (Password === passwordCheckCurrent) {
      setPasswordCheckMessage("동일하게 입력되었습니다.");
      setIsPasswordCheck(true);
    } else {
      setPasswordCheckMessage("비밀번호가 다릅니다.");
      setIsPasswordCheck(false);
    }
  };
  return (
    <div className="signup-background">
      <form onSubmit={OnSubmitHandler} className="signupform-div">
        <img alt="logo" src={logo} className="signup-logo"></img>
        <div className="signup-input-div">
          <label className="signupform-label">Email </label>
          <div>
            <input
              type="email"
              value={Email}
              onChange={onChangeEmail}
              className="signup-input"
            ></input>
            <p className="signup-message">
              {Email.length > 0 && (
                <span className={`message ${isEmail ? "success" : "error"}`}>
                  {emailMessage}
                </span>
              )}
            </p>
          </div>

          <label className="signupform-label">Password</label>
          <div>
            <input
              type="password"
              value={Password}
              onChange={onChangePassword}
              className="signup-input"
            ></input>
            <p className="signup-message">
              {Password.length > 0 && (
                <span className={`message ${isPassword ? "success" : "error"}`}>
                  {passwordMessage}
                </span>
              )}
            </p>
          </div>
          <label className="signupform-label">Password Check</label>
          <div>
            <input
              type="password"
              value={PasswordCheck}
              onChange={onChangePasswordCheck}
              className="signup-input"
            ></input>
            <p className="signup-message">
              {PasswordCheck.length > 0 && (
                <span
                  className={`message ${isPasswordCheck ? "success" : "error"}`}
                >
                  {passwordCheckMessage}
                </span>
              )}
            </p>
          </div>
          <label className="signupform-label">Name </label>
          <div>
            <input
              type="name"
              value={Name}
              onChange={onNameHandler}
              className="signup-input"
            ></input>
          </div>

          <br></br>
          <button
            type="submit"
            disabled={!(isEmail && isPassword && isPasswordCheck)}
            onClick={() => setOpenModal(true)}
            className="signup-button"
          >
            가입하기
          </button>
        </div>
        <ModalSignup open={openModal} onClose={() => setOpenModal(false)} />
      </form>
    </div>
  );
};

export default SignupForm;
