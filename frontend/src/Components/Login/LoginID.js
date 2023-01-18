//아이디를 확인해주는 컴포넌트입니다.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import axios from "axios";
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

  const click = () => {};
  //여기서 axios 통신을 사용하여 back에 아이디가 있는지 확인해줍니다.
  //back에서는 for문으로 찾아주는건가?..
  // axios 회원가입 참고 (post)
  // const onSubmitHandler = async (event) => {
  //   const [data, setData] = useState("");
  //   event.preventDefault();
  //   try {
  //     const response = await axios
  //       .post("http://192.168.31.27:8080/api/v1/users", {
  //         email: Email,
  //         password: Password,
  //         name: Name,
  //       })
  //       setData(response.data);
  //       console.log(data)
  //       // .then((res) => {
  //       //   console.log("response:", res);
  //         // if (res.status === 200) {
  //         // router.push('#')
  //         // console.log(res);
  //       // });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleSubmit = async (event) => {
    // const [data, setData] = useState("");
    event.preventDefault();
    try {
      const response = await axios.get("http://192.168.31.27:8080/api/v1/users", {params: {}});
      // params 뭘 보내야할지 생각해보기
      // console 찍어보고 원하는 정보 뽑아오기
      // 이메일을 보내서 원하는 정보 뽑아올 수 있나..?
      // setData(response);
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <LoginCard>
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
        <Link to="/Signup">회원가입</Link>
      </div>
    </LoginCard>
  );
};

export default LoginID;
