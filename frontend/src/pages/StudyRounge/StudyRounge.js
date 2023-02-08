import React from "react";

import Topbar from "../../Components/Topbar/Topbar";
// import RoungeBanner from "./RoungeBanner";
import StudyRounge from "../../Components/StudyRounge/StudyRounge";
import RoungeList from "../../Components/StudyRounge/RoungeList";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import OpenStudyAd from "../../Components/StudyRounge/StudyRoungeAd";
import Footer from "../../Components/Footer/Footer";

const StudyRoungeMain = () => {
  return (
    <>
      <Topbar />

      <div className={RoungeStyle.StudyRoungeContainer}>
        <h1>스터디 라운지</h1>
      </div>

      {/* <RoungeBanner /> */}
      <OpenStudyAd />
      <hr />
      <StudyRounge />
      <Footer />
    </>
  );
};

export default StudyRoungeMain;
