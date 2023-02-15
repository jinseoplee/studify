import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import StartPageStyle from "../../Style/Startpage/StartPage.module.css";
import Background from "../../assets/image/Rectangle 56.png";
import Emoji from "../../assets/image/Female Memojis.png";
import DashBoardImg from "../../assets/image/dashboard.png";
import StudyRoomImg from "../../assets/image/studyroom.png";
import AOS from "aos";
import "aos/dist/aos.css";

const StartPage = () => {
  const [tokencookies, , removeTokenCookies] = useCookies(["userToken"]);
  const [studyIdcookies, , removeStudyIdcookes] = useCookies(["studyId"]);
  const navigate = useNavigate();

  const goSignup = () => {
    navigate("/user/signup");
  };
  useEffect(() => {
    AOS.init();
    document
      .querySelectorAll("img")
      .forEach((img) => img.addEventListener("load", () => AOS.refresh()));
    removeTokenCookies("userToken");
    removeStudyIdcookes("studyId");
  }, []);

  return (
    <div className={StartPageStyle.wrapper}>
      <div className={StartPageStyle.contentwrapper}>
        <div className={StartPageStyle.startpageFull}>
          <img
            className={StartPageStyle.startpageBackground}
            src={Background}
            alt="Background"
          />
          <div className={StartPageStyle.StartPageSignup}>
            <div className={StartPageStyle.StartPageSignupContent}>
              <h4>나만의 스터디 관리를 원하시나요?</h4>
              <button
                className={StartPageStyle.startpageBtn}
                onClick={goSignup}
              >
                시작하기
              </button>
            </div>
            <img
              data-aos="fade-left"
              src={Emoji}
              alt="Emoji"
              className={StartPageStyle.StartPage}
            />
          </div>
        </div>
        <div className={StartPageStyle.StartPageStudyroom}>
          <img
            data-aos="fade-right"
            src={DashBoardImg}
            alt="Studyroom"
            className={StartPageStyle.StartPageImg}
          />
          <div className={StartPageStyle.StartPageStudyroomContent}>
            <h4>나만의 스터디를 만들고 화상 스터디 방을 만들 수 있습니다</h4>
            <p>스터디에 대한 설명 하나둘셋</p>
          </div>
        </div>
        <div className={StartPageStyle.StartPageMyStudy}>
          <img
            data-aos="fade-left"
            src={StudyRoomImg}
            alt="Studyroom"
            className={StartPageStyle.StartPageImg}
          />
          <div className={StartPageStyle.StartPageMyStudyContent}>
            <h4>스터디와 자신의 공부를 기록 관리할 수 있습니다</h4>
            <p>자기 공부 관리, 스터디 시간 기록, 동기부여 등</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
