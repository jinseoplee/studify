import React, { useEffect, useState } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css";
import RankPodium from "./RankPodium";
import Pagination from "../UI/Pagination";

const RankStudy = () => {
  // const [rank, setRank] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const dummyrankstudy = [
    {
      name: "김싸피",
      totalTime: "20",
    },
    {
      name: "이싸피",
      totalTime: "30",
    },
    {
      name: "손싸피",
      totalTime: "40",
    },
  ];
  const [ StudyRanking, setStudyRanking ] = useState("")
  const RankStudyhandler = async (event) => {
    // event.preventDefault();
    try {
      const response = await axios.get('http://192.168.31.155:8080/api/v1/users/rank');
      console.log(response.data.content);
      setStudyRanking(response.data.content)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log('여기에 스터디 내 랭킹 받아옵니다')
    RankStudyhandler();
  })
  dummyrankstudy.sort((a, b) => {
    return b.totalTime - a.totalTime;
  });
  return (
    <div>{StudyRanking}</div>
    // <div className={RankStyle.RankDetailContainer}>
    //   <div className={RankStyle.RankContentContainter}>
    //     {/* { AllRanking } */}
    //     <RankPodium data={dummyrankstudy} />
    //     <div className={RankStyle.RankBarContainer}>
    //       {dummyrankstudy.slice(offset, offset + limit).map((data, key) => (
    //         <div key={key} className={RankStyle.RankNameBox}>
    //           <span>{key + offset + 1}</span>
    //           <span>{data.name}</span>
    //           <span>{data.totalTime}</span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <Pagination
    //     total={dummyrankstudy.length}
    //     limit={limit}
    //     page={page}
    //     setPage={setPage}
    //   />
    // </div>
  );
};

export default RankStudy;
