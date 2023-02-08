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
        <div className={StartPageStyle.StartPageSignupContent}>
          <p>나만의 스터디 관리를 원하시나요?</p>
          <button className={StartPageStyle.startpageBtn} onClick={goSignup}>
            시작하기
          </button>
        </div>
        <img data-aos="fade-left" src={Emoji} alt="Emoji" className={StartPageStyle.StartPageImg}/>
      </div>
      <div className={StartPageStyle.StartPageStudyroom}>
        <div className={StartPageStyle.StartPageStudyroomContent}>
          <h1>나만의 스터디를 만들고 화상 스터디 방을 만들 수 있습니다</h1>
          <p>스터디에 대한 설명 하나둘셋</p>
        </div>
        <img data-aos="fade-right" src={Emoji} alt="Studyroom" className={StartPageStyle.StartPage}/>
      </div>
      <div className={StartPageStyle.StartPageMyStudy}>
        <div className={StartPageStyle.StartPageMyStudyContent}>
          <h1>스터디와 자신의 공부를 기록 관리할 수 있습니다</h1>
          <p>자기 공부 관리, 스터디 시간 기록, 동기부여 등</p>
        </div>
        <img data-aos="fade-left" src={Emoji} alt="Studyroom" className={StartPageStyle.StartPage}/>
      </div>
    </React.Fragment>
  );
};

export default StartPage;
