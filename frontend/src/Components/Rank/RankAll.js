import React, { useEffect, useState } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css";
import RankPodium from "./RankPodium";
import Pagination from "../UI/Pagination";

const RankAll = () => {
  // const [rank, setRank] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
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
      <div className={RankStyle.RankContentContainter}>
        {/* { AllRanking } */}
        <RankPodium data={dummyrankall} />
        <div className={RankStyle.RankBarContainer}>
          {dummyrankall.slice(offset, offset + limit).map((data, key) => (
            <div key={key} className={RankStyle.RankNameBox}>
              <span>{key + offset + 1}</span>
              <span>{data.name}</span>
              <span>{data.time}</span>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        total={dummyrankall.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default RankAll;
