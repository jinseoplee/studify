import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import RankDetail from "../../Components/Rank/RankDetail";
import Footer from "../../Components/Footer/Footer";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const Ranking = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <RankDetail />
      <Footer />
    </>
  );
};

export default Ranking;
