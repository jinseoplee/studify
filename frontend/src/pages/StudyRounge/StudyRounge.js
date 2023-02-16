import React from "react";

import Topbar from "../../Components/Topbar/Topbar";
import StudyRounge from "../../Components/StudyRounge/StudyRounge";
import OpenStudyAd from "../../Components/StudyRounge/StudyRoungeAd";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const StudyRoungeMain = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />

      {/* <RoungeBanner /> */}
      <OpenStudyAd />
      <StudyRounge />
    </>
  );
};

export default StudyRoungeMain;
