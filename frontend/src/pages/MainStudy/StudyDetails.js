import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import StudyDetail from "../../Components/MainStudy/StudyDetail";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const StudyDetails = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <StudyDetail />
    </>
  );
};

export default StudyDetails;
