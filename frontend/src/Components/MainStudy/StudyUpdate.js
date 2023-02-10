import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Topbar from "../Topbar/Topbar";
import SelectCapaBox from "../UI/SelectCapaBox";
import DayCheckbox from "../UI/DayCheckbox";
import SkillCheckBox from "../UI/SkillCheckBox";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyUpdate = () => {
  const navigate = useNavigate();

  //axios용
  const studyId = useSelector((state) => state.selectday.studyNum);
  const userToken = useSelector((state) => state.token.accesstoken);
  const [studydata, setStudyData] = useState([]);
  //본문용
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const Capacity = useSelector((state) => state.selectday.studyCapa);
  const days = useSelector((state) => state.selectday.userDay);
  const skills = useSelector((state) => state.selectday.studySkill);
  const [isPublic, setIsPublic] = useState(false);
  const token = useSelector((state) => state.token.accesstoken);

  //유효성 검사용
  const enteredTitleIsvalid = Title.trim() !== "";
  const checkSkill = skills.length !== 0;
  const checkDays = days.length !== 0;

  //본문용 Handler
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDes = (e) => {
    setDescription(e.target.value);
  };

  //post용 axios 함수
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
        const response = await axios.put(
          `/api/v1/studies/${studyId}`,
          {
            title: Title,
            description: Description,
            capacity: Capacity,
            day: days,
            category: skills,
            public: isPublic,
          },
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        );
        console.log(response);
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        swal("스터디 생성이 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/studies/${studyId}`, {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStudyData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <form
      className={StudyStyle.studyUpdateContainer}
      onSubmit={StudySubmitHandler}
    >
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
          <p className={StudyStyle.studyUpdateLabel}>기술 스택</p>
          <SkillCheckBox />
          {/* <p>{days}</p> */}
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
        <button type="submit" className={StudyStyle.StudyUpdateSubmit}>
          생성하기
        </button>
      </div>
    </form>
  );
};

export default StudyUpdate;
