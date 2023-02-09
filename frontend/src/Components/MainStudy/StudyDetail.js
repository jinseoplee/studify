import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import StudySwitchbar from "./StudySwitchbar";
import settingpng from "../../assets/image/settings.png";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";
import { selectdayActions } from "../../store/StudyStore";

const StudyDetail = () => {
  const dispatch = useDispatch();

  const studyId = useSelector((state) => state.selectday.studyNum);
  const studyM = useSelector((state) => state.selectday.studyM);
  const studyname = useSelector((state) => state.userStudyInfo.studyname);
  const userToken = useSelector((state) => state.token.accesstoken);
  const [dummyimg, setImg] = useState(
    "https://cdn.pixabay.com/photo/2013/10/27/17/14/snowfall-201496_960_720.jpg"
  );
  const imgstyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${dummyimg})`,
  };
  //   const navigate = useNavigate();
  // let url = "http://localhost:3000/videoroom";
  // const joinSession = () => {
  //   //이것을 이용해서 오픈비두 창으로 보내주면 될것같은데?
  //   window.open(url, "_blank", "noopener noreferrer");
  // };

  const outStudyHandler = () => {
    console.log("스터디 삭제");
    axios
      .delete(`api/v1/studies/leave/${studyId}`, {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`api/v1/studies/${studyId}`, {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div className={StudyStyle.StudyDetailContainer}>
        <div style={imgstyle}>
          <div className={StudyStyle.StudyDetailback}>
            <p className={StudyStyle.StudyDetailName}>
              {studyId}
              {studyname}
            </p>
            <button className={StudyStyle.StudyBtn}>참여하기</button>
            <button className={StudyStyle.StudyBtn} onClick={outStudyHandler}>
              나가기
            </button>
            <Link to="update">
              <img
                alt="settingpng"
                src={settingpng}
                style={{ width: "45px" }}
              ></img>
            </Link>
          </div>
        </div>
        <div className={StudyStyle.studySwitchbarContainer}>
          <StudySwitchbar id={studyId} />
          <hr className={StudyStyle.studyHr}></hr>
        </div>
        <div className={StudyStyle.studyDetailInside}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default StudyDetail;
