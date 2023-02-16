import React from "react";
import RankStyle from "../../Style/Rank/Rank.module.css";
import RankGetImage from "./RankGetImage";

const RankPodium = (props) => {
  const { data } = props;
  return (
    <div>
      <h1>명예의 전당</h1>
    <div className={RankStyle.RankPodiumContainer}>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankSecond} />
        <RankGetImage data={data[1]?.email} />
        <p>
          {data[1]?.name}
        </p>
      </div>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankFirst} />
        <RankGetImage data={data[0]?.email} />
        <p>
          {data[0]?.name}
        </p>
      </div>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankThird} />
        <RankGetImage data={data[2]?.email} />
        <p>
          {data[2]?.name}
        </p>
      </div>
    </div>
    </div>
  );
};

export default RankPodium;
