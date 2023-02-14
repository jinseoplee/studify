import { useOutletContext } from "react-router-dom";

import python from "../../assets/image/stack/icons/python_icon.png";
import java from "../../assets/image/stack/icons/java_icon.png";
import javascript from "../../assets/image/stack/icons/javascript_icon.png";
import Cplus from "../../assets/image/stack/icons/cpp_icon.png";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyInfo = () => {
  const { studydata } = useOutletContext();

  return (
    <div>
      <div className={StudyStyle.studyInfoContainer}>
        <div className={StudyStyle.studyContent}>
          <p>
            인 원: {studydata && studydata.users.length} / {studydata?.capacity}
          </p>
          <p className={StudyStyle.StudyInfoBox}>
            기술 스택 :
            {studydata &&
              studydata.category.map((skill) => (
                <div key={skill}>
                  <span className={StudyStyle.StudyInfoItem}>
                    {skill === "Python" && (
                      <img
                        alt="python"
                        src={python}
                        style={{ width: "40px" }}
                      ></img>
                    )}
                    {skill === "Java" && (
                      <img
                        alt="java"
                        src={java}
                        style={{ width: "40px" }}
                      ></img>
                    )}
                    {skill === "JavaScript" && (
                      <img
                        alt="javascript"
                        src={javascript}
                        style={{ width: "40px" }}
                      ></img>
                    )}
                    {skill === "C++" && (
                      <img
                        alt="C++"
                        src={Cplus}
                        style={{ width: "40px" }}
                      ></img>
                    )}
                  </span>
                </div>
              ))}
          </p>
          <p className={StudyStyle.StudyInfoBox}>
            일 정 :{" "}
            {studydata &&
              studydata?.day.map((studyday) => (
                <div key={studyday}>
                  <p className={StudyStyle.StudyInfoItem}>{studyday}</p>
                </div>
              ))}
          </p>
          <p className={StudyStyle.StudyInfoBox}>스터디장 : </p>
        </div>
      </div>
    </div>
  );
};

export default StudyInfo;
