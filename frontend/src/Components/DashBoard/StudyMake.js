import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboardstyle from "./Dashboard.module.css";
import SkillCheckBox from "../UI/SkillCheckBox";
import SelectCapaBox from "../UI/SelectCapaBox";
import DayCheckbox from "../UI/DayCheckbox";
import Topbar from "../Topbar/Topbar";
import axios from "axios";

const StudyMake = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const Capacity = useSelector((state) => state.selectday.studyCapa);
  const days = useSelector((state) => state.selectday.userDay);
  const skills = useSelector((state) => state.selectday.studySkill);
  const [isPublic, setIsPublic] = useState(false);

  const enteredTitleIsvalid = Title.trim() !== "";
  const checkSkill = skills.length !== 0;
  const checkDays = days.length !== 0;

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    // console.log(e.target.value.length);
  };
  const onChangeDes = (e) => {
    setDescription(e.target.value);
  };

  const StudySubmitHandler = async (event) => {
    event.preventDefault();
    if (!enteredTitleIsvalid) {
      alert("스터디명을 입력해주세요");
    } else if (!checkSkill) {
      alert("기술 스택을 선택해주세요");
    } else if (!checkDays) {
      alert("요일을 선택해주세요");
    } else {
      try {
        const response = await axios.post(
          "http://192.168.31.27:8080/api/v1/study",
          {
            // userid: "유저pk",
            // thumbnailUrl:
            //   "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcanadablog.tistory.com%2F139&psig=AOvVaw13fpUadImITUBRotyFE_3Z&ust=1675209858482000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCqpJbB8PwCFQAAAAAdAAAAABAE",
            title: Title,
            description: Description,
            host: "jjjp9966@gmail.com",
            capacity: Capacity,
            day: days,
            category: skills,
            public: isPublic,
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      onSubmit={StudySubmitHandler}
      className={Dashboardstyle.dashboardProfileContainer}
    >
      <Topbar />
      <div className={Dashboardstyle.StudyMakeContainer}>
        <p className={Dashboardstyle.StudyMakeTitle}>스터디 생성</p>
        <br></br>
        <div className={Dashboardstyle.StudyMakebox}>
          <p className={Dashboardstyle.StudyMakeLabel}>스터디명</p>
          <input
            type="text"
            value={Title}
            onChange={onChangeTitle}
            className={Dashboardstyle.StudyTitleinput}
          ></input>
        </div>
        <div className={Dashboardstyle.StudyMakebox}>
          <p className={Dashboardstyle.StudyMakeLabel}>기술 스택</p>
          <SkillCheckBox />
          {/* <p>{skills}</p> */}
        </div>
        <div className={Dashboardstyle.StudyMakebox}>
          <p className={Dashboardstyle.StudyMakeLabel}>스터디 정원</p>
          <SelectCapaBox />
          {/* <p>{Capacity}</p> */}
        </div>
        <div className={Dashboardstyle.StudyMakebox}>
          <p className={Dashboardstyle.StudyMakeLabel}>스터디 요일</p>
          <DayCheckbox />
          {/* <p>{days}</p> */}
        </div>
        <div className={Dashboardstyle.StudyMakebox}>
          <p className={Dashboardstyle.StudyMakeLabel}>스터디 소개글</p>
          <textarea
            cols="40"
            rows="8"
            value={Description}
            onChange={onChangeDes}
            className={Dashboardstyle.StudyDescriptioninput}
          ></textarea>
        </div>
        <div className={Dashboardstyle.StudyMakebox}>
          <p className={Dashboardstyle.StudyMakeLabel}>공개 설정</p>
          <p
            className={Dashboardstyle.publicbutton}
            onClick={() => {
              setIsPublic((e) => !e);
            }}
          >
            {isPublic ? "공개" : "비공개"}
          </p>
          <div>
            <button type="submit" className={Dashboardstyle.StudymakeSubmit}>
              생성하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StudyMake;
