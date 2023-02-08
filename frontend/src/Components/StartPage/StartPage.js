import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StartPageStyle from "../../Style/Startpage/StartPage.module.css";
import Background from "../../assets/image/Rectangle 56.png";
import Emoji from "../../assets/image/Female Memojis.png";
import AOS from "aos";
import "aos/dist/aos.css";

const StartPage = () => {
  const navigate = useNavigate();

  const goSignup = () => {
    navigate("/user/signup");
  };
  useEffect(() => {
    AOS.init();
  });

  return (
    <React.Fragment>
      <div className={StartPageStyle.startpageFull}>
        <img
          className={StartPageStyle.startpageBackground}
          src={Background}
          alt="Background"
        />
      </div>
      <div className={StartPageStyle.StartPageSignup}>
        <div className={StartPageStyle.StartPageContent}>
          <p>나만의 스터디 관리를 원하시나요?</p>
          <button className={StartPageStyle.startpageBtn} onClick={goSignup}>
            회원가입하러 가기
          </button>
        </div>
        <img data-aos="fade-left" src={Emoji} alt="Emoji" className={StartPageStyle.StartPageImg}/>
      </div>
      <div>
        <p>hi</p>
      </div>
    </React.Fragment>
  );
};

export default StartPage;
