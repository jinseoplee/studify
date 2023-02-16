import React, { useEffect, useState } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css";
import RankPodium from "./RankPodium";
import Pagination from "../UI/Pagination";
import { useSelector } from "react-redux";

const RankGenerations = () => {
  const userGeneration = useSelector((state) => state.userinfo.userGeneration);
  const [AllRanking, setAllRanking] = useState([]);
  const limit = 5;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const RankAllhandler = async () => {
    try {
      const response = await axios.get("/api/v1/users/rank");
      console.log(response);
      setAllRanking(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    RankAllhandler();
  }, []);

  return (
    <div className={RankStyle.RankDetailContainer}>
      <div className={RankStyle.RankContentContainter}>
        <RankPodium
          data={AllRanking?.filter(
            (data) => data.generation === userGeneration
          )}
        />
        <div className={RankStyle.RankBarContainer}>
          <h1>순위표</h1>
          {AllRanking?.filter((data) => data.generation === userGeneration)
            ?.slice(offset, offset + limit)
            ?.map((data, key) => (
              <div key={key} className={RankStyle.RankNameBox}>
                <div className={RankStyle.RankBoxInfo}>
                  <span className={RankStyle.RankColor}>{key + offset + 1}. </span>
                  <span>{data?.generation}기</span>
                  <span>{data?.region}</span>
                  <span>{data?.classNum}반</span>
                  <span>{data?.name}</span>
                </div>
                <div className={RankStyle.RankBoxTime}>
                  <span>
                    <h4>
                      {parseInt(data?.totalTime / 3600)}시간
                      {parseInt((data?.totalTime % 3600) / 60)}분
                      {parseInt(data?.totalTime % 60)}초
                    </h4>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Pagination
        total={AllRanking?.filter((data) => data.generation === userGeneration).length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default RankGenerations;
