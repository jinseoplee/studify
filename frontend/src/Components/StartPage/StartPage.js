import React from "react";
import { useNavigate } from "react-router-dom";
import StartPageStyle from "../../Style/Startpage/StartPage.module.css";
import Background from "../../assets/image/Rectangle 56.png";
import Emoji from "../../assets/image/Female Memojis.png";

const StartPage = () => {
  const navigate = useNavigate();

  const goSignup = () => {
    navigate("/user/signup");
  };

  return (
    <React.Fragment>
      <div className={StartPageStyle.startpageFull}>
        <img
          className={StartPageStyle.startpageBackground}
          src={Background}
          alt="Background"
        />
      </div>
      <img src={Emoji} alt="Emoji" />
      <p>나만의 스터디 관리를 원하시나요?</p>
      <button className={StartPageStyle.startpageBtn} onClick={goSignup}>
        회원가입하러 가기
      </button>
      <div>
        <p>hi</p>
      </div>
    </React.Fragment>
  );
};

export default StartPage;
