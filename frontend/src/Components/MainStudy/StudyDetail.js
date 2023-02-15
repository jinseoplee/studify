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
  let studyUserCheck = false;
  const [dummyimg, setImg] = useState(
    "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/A1Z/image/luE0JoNHfcq1dK6y1_6lAvvTqDI.jpg"
  );
  let userEmail = sessionStorage.getItem("email");
  const imgstyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${dummyimg})`,
  };

  //유저 확인
  const userCheckHandler = () => {
    studydata &&
      studydata.users.some((el) => {
        if (el !== userEmail) {
          studyUserCheck = true;
        }
        return studyUserCheck === true;
      });
  };

  //오픈 비두 참가
  let url = "/usercheck";
  const joinSession = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  // const getStudydata = async () => {
  //   try{
  //     const response = await axios
  //     .get(`/api/v1/studies/${studyId}`, {
  //       headers: {
  //         "X-Auth-Token": `${userToken}`,
  //       },
  //     })
  //     response.then((res) => {
  //       console.log(res);
  //       setStudyData(res.data.content);
  //     })
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   getStudydata();
  // }, []);

  const studyDataHandler = async () => {
    try {
      const res = await axios.get(`/api/v1/studies/${studyId}`, {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      });
      console.log(res);
      localStorage.setItem("studyId", studyId);
      setStudyData(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    studyDataHandler();
    userCheckHandler();
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
        navigate("/mainpage");
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
        navigate("/mainpage");
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
            <p className={StudyStyle.StudyDetailName}>
              {studydata.title}
              {studyUserCheck}
            </p>
            <div className={StudyStyle.StudyDetailButtons}>
              {studydata.users &&
                studydata.users.map((el) => (
                  <div key={el.id}>
                    {el.email === userEmail && (
                      <button
                        className={StudyStyle.StudyBtn}
                        onClick={joinSession}
                      >
                        회의하기
                      </button>
                    )}
                  </div>
                ))}

              {studyUserCheck === true && (
                <button
                  className={StudyStyle.StudyBtn}
                  onClick={joinStudyHandler}
                >
                  가입하기
                </button>
              )}
              {studydata.users &&
                userEmail !== studydata.createdBy &&
                studydata.users.map((el) => (
                  <div key={el.id}>
                    {el.email === userEmail && (
                      <button
                        className={StudyStyle.StudyBtn}
                        onClick={outStudyHandler}
                      >
                        나가기
                      </button>
                    )}
                  </div>
                ))}
              {userEmail === studydata.createdBy && (
                <button
                  className={StudyStyle.StudyBtn}
                  onClick={outStudyHandler}
                >
                  스터디 삭제
                </button>
              )}
            </div>
            {userEmail === studydata.createdBy && (
              <Link to="update">
                <img
                  alt="settingpng"
                  src={settingpng}
                  className={StudyStyle.StudySetting}
                ></img>
              </Link>
            )}
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
