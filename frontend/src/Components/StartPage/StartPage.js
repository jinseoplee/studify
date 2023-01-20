import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";
import './StartPage.css';
import Background from "../../assets/image/Rectangle 56.png"
import Emoji from "../../assets/image/Female Memojis.png"

const StartPage = () => {
  const navigate = useNavigate();
  //회원가입 페이지로 이동시켜주는 힘수입니다.
  const goSignup = () => {
    navigate("/Signup");
  }
  return (
    <React.Fragment>
      <Topbar />
      <div className="full">
        <img className="background" src={Background} alt="Background" />
      </div>
      <img src={Emoji} alt="Emoji" />
      <p>나만의 스터디 관리를 원하시나요?</p>
      <button className="btn" onClick={goSignup}>회원가입하러 가기</button>
      <div>
        <p>hi</p>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default StartPage;
