import React from "react";
import RankStyle from "../../Style/Rank/Rank.module.css";

const RankPodium = (props) => {
  const { data } = props;
  return (
    <div className={RankStyle.RankPodiumContainer}>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankSecond} />
        <p>{data[1].name} {data[1].time}</p>
      </div>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankFirst} />
        <p>{data[0].name} {data[0].time}</p>
      </div>
      <div className={RankStyle.RankPodiumDetail}>
        <div className={RankStyle.RankThird} />
        <p>{data[2].name} {data[2].time}</p>
      </div>
      {/* {data.slice(0, 3).map((value, key) => (
        <div key={key}>
          <div>
            <span>{key + 1}</span>
            <span>{value.name}</span>
            <span>{value.time}</span>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default RankPodium;
