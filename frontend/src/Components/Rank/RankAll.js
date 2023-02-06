import React, { useEffect, useState } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css"

const RankAll = () => {
  const dummyrankall = [
    {
      name: "김싸피",
      time: "20",
    },
    {
      name: "김싸피",
      time: "30",
    },
    {
      name: "김싸피",
      time: "41",
    },
    {
      name: "김싸피",
      time: "43",
    },
    {
      name: "김싸피",
      time: "47",
    },
    {
      name: "김싸피",
      time: "50",
    },
    {
      name: "김싸피",
      time: "42",
    },
    {
      name: "김싸피",
      time: "35",
    },
    {
      name: "김싸피",
      time: "31",
    },
  ];
  // const [ AllRanking, setAllRanking ] = useState("")
  // const RankAllhandler = async (event) => {
  //   // event.preventDefault();
  //   try {
  //     const response = await axios.get('#');
  //     console.log(response);
  //     setAllRanking(response)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   console.log('여기에 전체 랭킹 받아옵니다')
  //   RankAllhandler();
  // })
  dummyrankall.sort((a, b) => {
    return b.time - a.time;
  });
  return (
    <div className={RankStyle.RankDetailContainer}>
      전체 랭킹 페이지 입니다.
      {/* { AllRanking } */}
      {dummyrankall.map((data, key) => (
        <div key={key} className={RankStyle.RankNameBox}>
          <p>{key + 1} {data.name} {data.time}</p>
        </div>
      ))}
    </div>
  );
};

export default RankAll;
