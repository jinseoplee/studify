import React, { useEffect, useState } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css";

const RankStudy = () => {
  const dummyrankstudy = [
    {
      name: "김싸피",
      time: "20",
    },
    {
      name: "이싸피",
      time: "30",
    },
    {
      name: "손싸피",
      time: "40",
    },
  ];
  // const [ StudyRanking, setStudyRanking ] = useState("")
  // const RankStudyhandler = async (event) => {
  //   // event.preventDefault();
  //   try {
  //     const response = await axios.get('#');
  //     console.log(response);
  //     setStudyRanking(response)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   console.log('여기에 스터디 내 랭킹 받아옵니다')
  //   RankStudyhandler();
  // })
  dummyrankstudy.sort((a, b) => {
    return b.time - a.time;
  });
  return (
    <div className={RankStyle.RankDetailContainer}>
      {/* { AllRanking } */}
      {dummyrankstudy.map((data, key) => (
        <div key={key} className={RankStyle.RankNameBox}>
          <div>
            <span>{key + 1}</span>
            <span>{data.name}</span>
            <span>{data.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankStudy;
