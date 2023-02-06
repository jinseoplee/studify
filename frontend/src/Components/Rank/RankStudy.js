import React, { useEffect, useState } from "react";
import axios from "axios";


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
  return (
    <div>
      스터디 내 랭킹 페이지 입니다.
      {/* { StudyRanking } */}
      {dummyrankstudy.map((data, key) => (
          <div key={key}>
              <h4>{data.name}</h4>
              <p>{data.time}</p>
          </div>
        ))}
    </div>
  );
};

export default RankStudy;
