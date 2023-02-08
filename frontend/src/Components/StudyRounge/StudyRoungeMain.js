import React from "react";

import Topbar from "../Topbar/Topbar";
// import RoungeBanner from "./RoungeBanner";
import StudyRounge from "./StudyRounge";
import RoungeList from "./RoungeList";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import OpenStudyAd from "./StudyRoungeAd";

const StudyRoungeMain = () => {
  return (
    <>
      <Topbar />

      <div className={RoungeStyle.StudyRoungeContainer}>
        <h1>스터디 라운지</h1>
      </div>

      {/* <RoungeBanner /> */}
      <OpenStudyAd />

      <StudyRounge />

      <RoungeList />
    </>
  );
};

export default StudyRoungeMain;
