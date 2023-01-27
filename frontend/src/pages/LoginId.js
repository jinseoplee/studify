import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import swal from "sweetalert";
// import { loginIdpass } from "../utils/api";

import LoginID from "../Components/Login/LoginID";

const LoginId = () => {
  const [email, setEmail] = useState("");
  //쿠키 이름이 useremail입니다.

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

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/v1/users/${email}`);
      //axios post요청으로 보내야합니다.
      console.log(response);
      if (isRemember) {
        setCookie("useremail", email);
      } else {
        removeCookie("useremail");
      }
      localStorage.setItem("email", email);
      //이메일을 로컬 스토리지에 저장..
      navigate("/user/login/pw");
    } catch (err) {
      console.log(err);
      swal("아이디가 잘못 입력 되었습니다. 다시입력해주세요");
    }
  };

  //체크박스가 바뀌는 것을 확인해줍니다.
  const togglecheck = (event) => {
    setIsRemember(event.target.checked); //체크박스를 이벤트 부분으로 확인.
  };
  return (
    <>
      <LoginID
        email={email}
        isRemember={isRemember}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        togglecheck={togglecheck}
      />
    </>
  );
};

export default LoginId;

//밑에 action이 있어야함.
// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const post = formData.get("email");
//   try {
//     await loginIdpass(post);
//     //로그인 아이디패스 api.js에 생성
//   } catch (err) {
//     if (err.status === 422) {
//       return err;
//     }
//     throw err;
//   }
//   //만약 아이디가 일치해서 통과했다면?
//   //비밀번호 페이지로 이동시켜줍니다.
//   return redirect("user/login/pw");
// };
