import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import SkillCheckBox from "../UI/SkillCheckBox";
import SelectCapaBox from "../UI/SelectCapaBox";
import DayCheckbox from "../UI/DayCheckbox";
import Topbar from "../Topbar/Topbar";
import axios from "axios";
import swal from "sweetalert";

const StudyMake = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const onChangeDescription = () => {
    setDescription(editorRef.current.getInstance().getHTML());
  };
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const Capacity = useSelector((state) => state.selectday.studyCapa);
  const days = useSelector((state) => state.selectday.userDay);
  const skills = useSelector((state) => state.selectday.studySkill);
  const [isPublic, setIsPublic] = useState(false);
  const token = useSelector((state) => state.token.accesstoken);

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
        console.log(typeof Description);
        const response = await axios.post(
          "/api/v1/studies",
          {
            title: Title,
            description: Description,
            capacity: Capacity,
            day: days,
            category: skills,
            isPublic: isPublic,
          },
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        );
        console.log(response);
        navigate("/mainpage");
      } catch (err) {
        console.log(err);
        swal("스터디 생성이 실패했습니다.");
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
          <Editor
            initialValue="소개를 넣어주세요"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            language="ko-KR"
            ref={editorRef}
            useCommandShortcut={false}
            onChange={onChangeDescription}
          ></Editor>
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
