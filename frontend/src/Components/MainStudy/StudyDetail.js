import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import StudySwitchbar from "./StudySwitchbar";
import settingpng from "../../assets/image/settings.png";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";
import axios from "axios";
import swal from "sweetalert";

const StudyDetail = () => {
  const navigate = useNavigate();
  // const outletData = { studyData: studydata };
  const studyId = useSelector((state) => state.selectday.studyNum);
  const userToken = useSelector((state) => state.token.accesstoken);
  const [studydata, setStudyData] = useState("");
  const [dummyimg, setImg] = useState(
    "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/A1Z/image/luE0JoNHfcq1dK6y1_6lAvvTqDI.jpg"
  );
  const imgstyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${dummyimg})`,
  };

  //오픈 비두 참가
  let url = "/videoroom";
  const joinSession = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  useEffect(() => {
    console.log(studydata);
    axios
      .get(`/api/v1/studies/${studyId}`, {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStudyData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const outStudyHandler = () => {
    axios
      .delete(`/api/v1/studies/leave/${studyId}`, {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        swal("삭제할 수 없는 스터디입니다");
      });
  };
  const joinStudyHandler = () => {
    axios
      .post(
        `/api/v1/studies/${studyId}`,
        {},
        {
          headers: {
            "X-Auth-Token": `${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={StudyStyle.StudyDetailContainer}>
        <div style={imgstyle}>
          <div className={StudyStyle.StudyDetailback}>
            <p className={StudyStyle.StudyDetailName}>{studydata.title}</p>
            <div className={StudyStyle.StudyDetailButtons}>
              <button className={StudyStyle.StudyBtn} onClick={joinSession}>
                회의하기
              </button>
              <button
                className={StudyStyle.StudyBtn}
                onClick={joinStudyHandler}
              >
                가입하기
              </button>
              <button className={StudyStyle.StudyBtn} onClick={outStudyHandler}>
                나가기
              </button>
            </div>
            <Link to="update">
              <img
                alt="settingpng"
                src={settingpng}
                className={StudyStyle.StudySetting}
              ></img>
            </Link>
          </div>
        </div>
        <div className={StudyStyle.studySwitchbarContainer}>
          <StudySwitchbar id={studyId} />
          <hr className={StudyStyle.studyHr}></hr>
        </div>
        <div className={StudyStyle.studyDetailInside}>
          <Outlet context={{ studydata }} />
        </div>
      </div>
    </>
  );
};
export default StudyDetail;
