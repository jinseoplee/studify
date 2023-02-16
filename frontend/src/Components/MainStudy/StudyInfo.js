import { useOutletContext } from "react-router-dom";

import python from "../../assets/image/stack/icons/python_icon.png";
import java from "../../assets/image/stack/icons/java_icon.png";
import javascript from "../../assets/image/stack/icons/javascript_icon.png";
import Cplus from "../../assets/image/stack/icons/cpp_icon.png";
import c from "../../assets/image/stack/icons/c_icon.png";
import react from "../../assets/image/stack/icons/react_icon.png";
import spring from "../../assets/image/stack/icons/spring_icon.png";
import vue from "../../assets/image/stack/icons/vue_icon.png";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyInfo = () => {
  const { studydata } = useOutletContext();

  return (
    <div>
      <div className={StudyStyle.studyInfoContainer}>
        <div className={StudyStyle.studyContent}>
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "20px" }}>인 원 :</p>
            <p>
              {studydata.users && studydata.users.length} /{" "}
              {studydata?.capacity}
            </p>
          </div>
          <div className={StudyStyle.StudyInfoBox}>
            <p style={{ marginRight: "15px" }}>기 술 :</p>
            <div style={{ display: "flex" }}>
              {studydata.category &&
                studydata.category.map((skill) => (
                  <div key={skill}>
                    <span>
                      {skill === "python" && (
                        <img
                          alt="python"
                          src={python}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                      {skill === "java" && (
                        <img
                          alt="java"
                          src={java}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                      {skill === "javascript" && (
                        <img
                          alt="javascript"
                          src={javascript}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                      {skill === "cpp" && (
                        <img
                          alt="Cplus"
                          src={Cplus}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                      {skill === "c" && (
                        <img
                          alt="C"
                          src={c}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                      {skill === "react" && (
                        <img
                          alt="react"
                          src={react}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                      {skill === "spring" && (
                        <img
                          alt="spring"
                          src={spring}
                          style={{
                            width: "40px",
                            marginTop: "10px",
                            marginRight: "5px",
                          }}
                        ></img>
                      )}
                      {skill === "vue" && (
                        <img
                          alt="vue"
                          src={vue}
                          style={{ width: "40px", marginRight: "5px" }}
                        ></img>
                      )}
                    </span>
                  </div>
                ))}
            </div>
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
          <div className={StudyStyle.StudyInfoBox}>
            <p style={{ marginTop: "10px" }}>이메일 : {studydata.createdBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyInfo;
