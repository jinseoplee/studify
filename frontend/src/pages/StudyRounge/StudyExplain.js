import React from "react";
import Footer from "../../Components/Footer/Footer";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";
import Topbar from "../../Components/Topbar/Topbar";

const StudyExplain = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <h1>스터디 사용설명서</h1>
      <Footer />
    </>
  );
};

export default StudyExplain;
