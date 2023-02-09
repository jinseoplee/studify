import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import makestudy from "../../assets/image/plus.png";
import { selectdayActions } from "../../store/StudyStore";

const dummy = [
  { studyname: "첫번째 스터디", studyId: 1, studySkill: "python", member: [] },
  { studyname: "두번째 스터디", studyId: 2, studySkill: "java", member: [] },
];

const MyStudy = ({ studies }) => {
  const dispatch = useDispatch();

  const studyClickHandler = (params, e) => {
    e.preventDefault();
    dispatch(selectdayActions.changestudynum(params));
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
            <div key={study.id} className={Dashboardstyle.MyStudyListItem}>
              <p
                onClick={(e) => {
                  studyClickHandler(study.id, e);
                }}
              >
                <Link to={`/study/${study.id}`}>{study.title}</Link>
              </p>
              <p>{study.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStudy;
