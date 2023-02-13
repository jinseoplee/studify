import React from "react";

import Topbar from "../../Components/Topbar/Topbar";
// import RoungeBanner from "./RoungeBanner";
import StudyRounge from "../../Components/StudyRounge/StudyRounge";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import OpenStudyAd from "../../Components/StudyRounge/StudyRoungeAd";
import Footer from "../../Components/Footer/Footer";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const StudyRoungeMain = () => {
  return (
    <>
      {/* <TokenCheck /> */}
      <Topbar />

      {/* <RoungeBanner /> */}
      <OpenStudyAd />
      <StudyRounge />
      <Footer />
    </>
  );
};

export default StudyRoungeMain;
