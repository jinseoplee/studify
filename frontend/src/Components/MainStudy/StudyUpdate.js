import { useState } from "react";
import { useSelector } from "react-redux";
import Topbar from "../Topbar/Topbar";
import SelectCapaBox from "../UI/SelectCapaBox";
import DayCheckbox from "../UI/DayCheckbox";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyUpdate = () => {
  const studyId = useSelector((state) => state.selectday.studyNum);
  const Capacity = useSelector((state) => state.selectday.studyCapa);
  const days = useSelector((state) => state.selectday.userDay);
  //본문용
  const [isPublic, setIsPublic] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  //본문용 Handler
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDes = (e) => {
    setDescription(e.target.value);
  };
  return (
    <form className={StudyStyle.studyUpdateContainer}>
      <Topbar />
      <div className={StudyStyle.studyUpdatesecondContainer}>
        <p className={StudyStyle.StudyUpdateH}>스터디 수정</p>
        <br></br>
        <div className={StudyStyle.studyUpdatebox}>
          <p className={StudyStyle.studyUpdateLabel}>스터디명</p>
          <input
            type="text"
            value={Title}
            onChange={onChangeTitle}
            // onChange={}
            className={StudyStyle.StudyUpdateTitle}
          ></input>
        </div>
        <div className={StudyStyle.studyUpdatebox}>
          <p className={StudyStyle.studyUpdateLabel}>스터디 정원</p>
          <SelectCapaBox />
        </div>
        <div className={StudyStyle.studyUpdatebox}>
          <p className={StudyStyle.studyUpdateLabel}>스터디 요일</p>
          <DayCheckbox />
          {/* <p>{days}</p> */}
        </div>
        <div className={StudyStyle.studyUpdatebox}>
          <p className={StudyStyle.studyUpdateLabel}>스터디 소개글</p>
          <textarea
            cols="40"
            rows="8"
            value={Description}
            onChange={onChangeDes}
            className={StudyStyle.StudyUpdateDescription}
          ></textarea>
        </div>
        <div className={StudyStyle.studyUpdatebox}>
          <p className={StudyStyle.studyUpdateLabel}>공개 설정</p>
          <p
            className={StudyStyle.StudyUpdatePublic}
            onClick={() => {
              setIsPublic((e) => !e);
            }}
          >
            {isPublic ? "공개" : "비공개"}
          </p>
        </div>
      </div>
    </form>
  );
};

export default StudyUpdate;
