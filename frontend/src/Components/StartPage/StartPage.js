import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";

const StartPage = () => {
  const navigate = useNavigate();
  //회원가입 페이지로 이동시켜주는 힘수입니다.
  const goSignup = () => {
    navigate("/Signup");
  }
  return (
    <React.Fragment>
      <Topbar />
        <button onClick={goSignup}>회원가입하러 가기</button>
      <Footer />
    </React.Fragment>
  );
};

export default StartPage;
