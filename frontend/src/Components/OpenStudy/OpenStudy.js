import React from "react";
import OpenStudyAd from "../StudyRounge/StudyRoungeAd";
import openstudyStyle from "../../Style/OpenStudy/OpenStudy.module.css";

const Openstudy = () => {
  return (
    <>
      <OpenStudyAd />
      <div className={openstudyStyle.filterButton}>
        <button>Python</button>
        <button>Java</button>
        <button>JavaScript</button>
        <button>C++</button>
        <button>Vue</button>
        <button>React</button>
        <button>etc</button>
      </div>
    </>
  );
};

export default Openstudy;
