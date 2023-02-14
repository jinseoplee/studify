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
            인 원: {studydata.users && studydata.users.length} /{" "}
            {studydata?.capacity}
          </p>
          <div className={StudyStyle.StudyInfoBox}>
            기술 스택 :
            {studydata.category &&
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
          </div>
          <div className={StudyStyle.StudyInfoBox}>
            일 정 :{" "}
            {studydata.day &&
              studydata.day.map((studyday) => (
                <div key={studyday}>
                  <p className={StudyStyle.StudyInfoItem}>{studyday}</p>
                </div>
              ))}
          </div>
          <div className={StudyStyle.StudyInfoBox}>스터디장 : </div>
        </div>
      </div>
    </div>
  );
};

export default StudyInfo;
