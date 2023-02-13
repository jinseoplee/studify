import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import StudyDetail from "../../Components/MainStudy/StudyDetail";
import Footer from "../../Components/Footer/Footer"
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const StudyDetails = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <StudyDetail />
      <Footer />
    </>
  );
};

export default StudyDetails;
