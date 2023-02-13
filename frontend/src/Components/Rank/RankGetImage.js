import React, { useState, useEffect } from "react";
import axios from "axios";
import RankStyle from "../../Style/Rank/Rank.module.css";

const RankGetImage = (props) => {
  const { data } = props;
  console.log(data);
  const [myProfile, setMyProfile] = useState("");
  useEffect(() => {
    axios
      .get("/api/v1/users/rank/image", {
        params: {
          email: data,
        },
        responseType: "blob",
      })
      .then((response) => {
        console.log(response.data);
        setMyProfile(URL.createObjectURL(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  return (
    <>
      <img className={RankStyle.ProfileImg} src={myProfile} />
    </>
  );
};

export default RankGetImage;
