import React, { useEffect, useState } from "react";
import axios from "axios";


const RankAll = () => {
  const dummyrankall = [
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
  return (
    <div>
      전체 랭킹 페이지 입니다.
      {/* { AllRanking } */}
      {dummyrankall.map((data, key) => (
          <div key={key}>
              <h4>{data.name}</h4>
              <p>{data.time}</p>
          </div>
        ))}
    </div>
  );
};

export default RankAll;
