import React, { useEffect, useState } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css";
import RankPodium from "./RankPodium";
import Pagination from "../UI/Pagination";

const RankAll = () => {
  const [AllRanking, setAllRanking] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const RankAllhandler = async () => {
    try {
      const response = await axios.get(
        "http://192.168.31.155:8080/api/v1/users/rank"
      );
      console.log(response)
      console.log(response.data.content);
      setAllRanking(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    RankAllhandler();
  }, []);

  // AllRanking?.sort((a, b) => {
  //   return b.totalTime - a.totalTime;
  // });

  return ( 
    <div className={RankStyle.RankDetailContainer}>
      <div className={RankStyle.RankContentContainter}>
        <RankPodium data={AllRanking} />
        <div className={RankStyle.RankBarContainer}>
          {AllRanking?.slice(offset, offset + limit)?.map((data, key) => (
            <div key={key} className={RankStyle.RankNameBox}>
              <span>{key + offset + 1}</span>
              <span>{data?.name}</span>
              <span>{data?.totalTime}</span>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        total={AllRanking.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default RankAll;
