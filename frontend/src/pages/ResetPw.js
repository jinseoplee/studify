import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResetPW from "../Components/Login/ResetPW";

//함수 부분이 들어갈 페이지입니다.
const ResetPw = () => {
  const navigate = useNavigate();

  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

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

  //폼을 제출할때. 비밀번호 맞는지 확인? 또는 axios?
  const ResetPw = async (event) => {
    event.preventDefault();
    console.log(localStorage.getItem(" "));
    try {
      const response = await axios.put(`/api/v1/users/pass`, {
        email: localStorage.getItem("findemail"),
        password: Password,
      });
      console.log(response);
      localStorage.removeItem("findname");
      localStorage.removeItem("findemail");
      //만약 정보가 맞으면?
      navigate("/user/login/pw"); //이 부분이 애매하네..
      //컴포넌트만 바꿔 끼우는 거라 useLocation은 현재 내 페이지에 있는 값을 가져오는 것이다.
      //redirect를 쓴적이 없어 가지고 있지 않을까? 라는 생각.
      //useLocation은 현재 페이지에 있는 것을 가져오는 것이라 모달창으로 띄운것을 가져오지 못했다.
      //localStorage에 저장하여 해당 정보를 보고 비밀번호 재설정 후 바로 파기시켜준다면?
      //redux를 사용한다면 중앙 저장소에서 가져오면 된다.(best아닐까?)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ResetPW
        Password={Password}
        onChangePassword={onChangePassword}
        isPassword={isPassword}
        passwordMessage={passwordMessage}
        PasswordCheck={PasswordCheck}
        onChangePasswordCheck={onChangePasswordCheck}
        isPasswordCheck={isPasswordCheck}
        passwordCheckMessage={passwordCheckMessage}
        ResetPw={ResetPw}
      />
    </>
  );
};

export default ResetPw;
