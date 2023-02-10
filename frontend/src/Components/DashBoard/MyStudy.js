import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import makestudy from "../../assets/image/plus.png";
import { selectdayActions } from "../../store/StudyStore";
import lockImg from "../../assets/image/lock.png";
import unlockImg from "../../assets/image/unlock.png";

const MyStudy = ({ studies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studyClickHandler = (params, e) => {
    e.preventDefault();
    dispatch(selectdayActions.changestudynum(params));
    navigate(`/study/${params}`);
  };

  //나의 스터디 리스트를 눌렀을 경우 리덕스에 그 번호 저장
  return (
    <div className={Dashboardstyle.MyStudycontainer}>
      <h3>나의 스터디</h3>
      <div className={Dashboardstyle.MyStudybox}>
        <Link to="/study/newstudy" className={Dashboardstyle.MyStudyMake}>
          <img
            className={Dashboardstyle.MyStudyMakeLogo}
            src={makestudy}
            alt="makestudy"
          />
        </Link>

        <div className={Dashboardstyle.MyStudyList}>
          {studies.map((study) => (
            <div
              key={study.id}
              className={Dashboardstyle.MyStudyListItem}
              onClick={(e) => {
                studyClickHandler(study.id, e);
              }}
            >
              <p className={Dashboardstyle.MystudyTitle}>
                {study.title}
                {!study.public && (
                  <img
                    alt="공개"
                    src={unlockImg}
                    style={{ width: "30px", marginLeft: "15px" }}
                  ></img>
                )}
                {study.public && (
                  <p>
                    <img
                      alt="비공개"
                      src={lockImg}
                      style={{ width: "30px" }}
                    ></img>
                  </p>
                )}
              </p>
              <div className={Dashboardstyle.flexbox}>
                {study.category.map((skill) => (
                  <div key={skill}>
                    <p className={Dashboardstyle.MyStudyTag}>{skill}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>{study.public}</p>
                <p className={Dashboardstyle.MyStudyDes}>{study.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStudy;
