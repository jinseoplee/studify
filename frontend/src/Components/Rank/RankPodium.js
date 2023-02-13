import React, { useState } from "react";
import RankStyle from "../../Style/Rank/Rank.module.css";
import axios from "axios";
import RankGetImage from "./RankGetImage";
import { useEffect } from "react";

const RankPodium = (props) => {
  const { data } = props;
  console.log(data)
  // const first = data[0]?.email
  // const second = data[1]?.email
  // const third = data[2]?.email
  // const [myImage, setMyImage] = useState([]);
  // const GetImghandler = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/users/rank/image", {
  //       params: {
  //         email: email
  //       },
  //       responseType: "blob",
  //     });
  //     console.log(response);
  //     let objectURL = URL.createObjectURL(response.data);
  //     setMyImage(arr => [arr,objectURL]);
  //     console.log(response)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {

  // }, []);
  return (
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
  );
};

export default RankPodium;
