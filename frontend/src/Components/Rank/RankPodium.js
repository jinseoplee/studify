import React from "react";
import RankStyle from "../../Style/Rank/Rank.module.css";

const RankPodium = (props) => {
  const { data } = props;
  // console.log(data)
  return (
    <div className={RankStyle.RankPodiumContainer}>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankSecond} />
        <p>{data[1]?.name} {data[1]?.totalTime}</p>
      </div>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankFirst} />
        <p>{data[0]?.name} {data[0]?.totalTime}</p>
      </div>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankThird} />
        <p>{data[2]?.name} {data[2]?.totalTime}</p>
      </div>
    </div>
  );
};

export default RankPodium;
