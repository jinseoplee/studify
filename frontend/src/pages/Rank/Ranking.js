import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import RankDetail from "../../Components/Rank/RankDetail";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";

const Ranking = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />
      <RankDetail />
    </>
  );
};

export default Ranking;
