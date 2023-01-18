//아이디를 확인해주는 컴포넌트입니다.
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginCard from "./LoginCard";
import axios from "axios";
import "./LoginID.css";


const LoginID = (props) => {
  // const [loginInfo, setValues] = useState("");

  const navigate = useNavigate();

  const goLoginPw = () => {
    navigate("/loginPw");
  }
  const [Email, setEmail] = useState("");
  //아이디 저장 체크박스 유무를 알려줍니다.
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['useremail']);
  //페이지 최초 랜더링 될때
  useEffect(() => {
    //만약 쿠키 값이 있다면 체크박스를 true로 만들어주고 id부분에 값 세팅
    if (cookies.useremail !== undefined) { //값이 있다면?
        setEmail(cookies.useremail); //이메일의 값을 쿠키에 있는 값으로 넣어주고
        setIsRemember(true); //체크박스를 true로 만들어줍니다.
      }
  },[cookies.useremail])

  const cookieup = () => {
    if(isRemember) {
      setCookie('useremail', Email);
    }
  }
  //그러고나서 이곳에서 현재의 값을 넣어줌.
  const handleOnChange = (e) => {
    setIsRemember(e.target.checked); //체크박스를 이벤트 부분으로 확인.
    console.log(e.target.checked);
    if(e.target.checked){ //체크가 되어있다면?
      setCookie('useremail', Email); //쿠키저장
    } else { //체크 안되어있으면 쿠키 삭제.
    removeCookie('useremail');
    }
  }
  const handleChange = (event) => {
    // setValues({
    //   ...loginInfo,
    //   [event.target.name]: event.target.value,
    // });
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);
  };

  const check = (event) => {
    if (Email === "") {
      alert("아이디를 입력하지 않았습니다.");
      event.preventDefault();
    } else {
      console.log(Email);
    }
  };

  const click = () => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.31.27:8080/api/v1/users/signin",
        {
          email: Email,
        }
      );
      console.log(response);
      goLoginPw();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <LoginCard>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={Email}
          onChange={handleChange}
        />
        <input type="checkbox" onChange={handleOnChange} checked={isRemember}/>
        <button type="submit" onClick={check}>
          다음
        </button>
      </form>
        <button onClick={cookieup}>쿠키 등록하기</button>
        <button onClick={goLoginPw}>비밀번호페이지이동</button>
      <div onClick={click}>아이디를 잊어버리셨나요?</div>
      <div>
        아이디가 존재하지 않으신가요?
        <Link to="/Signup">회원가입</Link>
      </div>
    </LoginCard>
  );
};

export default LoginID;