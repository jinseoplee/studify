//아이디를 확인해주는 컴포넌트입니다.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginID.css";

const LoginID = (props) => {
  const [loginInfo, setValues] = useState("");

  const handleChange = (event) => {
    setValues({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const check = (event) => {
    if (loginInfo.email === "") {
      alert("아이디를 입력하지 않았습니다.");
      event.preventDefault();
    } else {
      console.log(loginInfo);
    }
  };

  const click = () => {
    console.log("나 클릭돼 ㅁㅋㅋ");
  };
  //여기서 axios 통신을 사용하여 back에 아이디가 있는지 확인해줍니다.
  //back에서는 for문으로 찾아주는건가?..
  const handleSubmit = (event) => {};

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={loginInfo.id}
          onChange={handleChange}
        />
        <button type="submit" onClick={check}>
          다음
        </button>
      </form>
      <div onClick={click}>아이디를 잊어버리셨나요?</div>
      <div>
        아이디가 존재하지 않으신가요?
        <Link to="/SignUp">회원가입</Link>
      </div>
    </React.Fragment>
  );
};

export default LoginID;
