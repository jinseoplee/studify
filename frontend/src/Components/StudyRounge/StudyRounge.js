import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectstudyActions } from "../../store/StudyRounge";

import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
// import Python from "../../assets/image/stack/python.PNG";
// import Java from "../../assets/image/stack/java.PNG";
// import Javascript from "../../assets/image/stack/javascript.PNG";
// import Cpp from "../../assets/image/stack/cpp.PNG";
// import Vue from "../../assets/image/stack/vue.PNG";
// import react from "../../assets/image/stack/react.PNG";
// import Spring from "../../assets/image/stack/spring.PNG";

const StudyRounge = () => {
  const dispatch = useDispatch();
  const data = [
    {
      id: 0,
      skill: "python",
    },
    {
      id: 1,
      skill: "java",
    },
    {
      id: 2,
      skill: "javascript",
    },
    {
      id: 3,
      skill: "cpp",
    },
    {
      id: 4,
      skill: "vue",
    },
    {
      id: 5,
      skill: "spring",
    },
    {
      id: 6,
      skill: "react",
    },
  ];

  const studyViewData = [
    {
      id: 100, //우리반 스터디인지 확인하는 아이디(100번)
      checkStudy: "우리반보기",
    },
    {
      id: 101, //전체 보기
      checkStudy: "전체보기",
    },
    {
      id: 102, //공개스터디만
      checkStudy: "공개만",
    },
  ];
  const [checkSkill, setCheckSkill] = useState([]);
  const [checkViewStudy, setCheckViewStudy] = useState([]);

  const handleSkillCheck = (checked, id) => {
    if (checked) {
      setCheckSkill((prev) => [...prev, id]);
    } else {
      setCheckSkill(checkSkill.filter((el) => el !== id));
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckViewStudy((prev) => [...prev, id]);
      console.log("클릭됌?1");
    } else {
      setCheckViewStudy(checkViewStudy.filter((el) => el !== id));
      console.log("클릭됌?2");
    }
  };

  const changeList = () => {
    //이 안에서 2개의 dispatch가 동작해야한다.
    //1. 체크된 스킬을 dispatch해서 나중에 다시 랜더링 될때 useSelector를 사용하여
    //해당 id에 해당되는 부분의 data가 존재시 체크되게 만들어주어야한다.
    //2. 밑에 부분 도 똑같이 동작시켜주어야합니다.
    // checked={checkSkill.includes(data.skill) ? true : false}
  };
  //해당 배열이 존재하는 경우에는? className을 새로줘서 button의 border에 색을 주어서 처리하면 내가 눌렀다는 걸 알지 않을까?
  dispatch(selectstudyActions.changestudySelect(checkViewStudy));
  return (
    <div>
      <div className={RoungeStyle.RoungeFilterContainer}>
        {data.map((data, key) => (
          <div key={key}>
            <button
              className={RoungeStyle.RoungeFilterBtn}
              name={`select-${data.id}`}
              onChange={(e) => handleSkillCheck(e.target.checked, data.skill)}
              id={data.skill}
            >
              <img
                src={require(`../../assets/image/stack/${data.skill}.PNG`)}
              />
            </button>
          </div>
        ))}
      </div>
      <div className={RoungeStyle.RoungeFilterContainer}>
        {studyViewData.map((data, key) => (
          <div key={key}>
            <label htmlFor={data.checkStudy}>{data.checkStudy}</label>
            <input
              type="checkbox"
              name={`select-${data.id}`}
              onChange={(e) =>
                handleSingleCheck(e.target.checked, data.checkStudy)
              }
              checked={checkViewStudy.includes(data.checkStudy) ? true : false}
              // id="chk_top"
              id={data.checkStudy}
            ></input>
          </div>
        ))}
        {/* <fieldset>
          <label htmlFor="classStudy">우리반 스터디 보기</label>
          <input
            type="checkbox"
            id="classStudy"
            onChange={toggleClassStudy}
            checked={isOurClassStudy}
            className={RoungeStyle.RoungeCheckBox}
          />

          <label htmlFor="entireView">전체 보기</label>
          <input
            type="checkbox"
            id="entireView"
            onChange={toggleEntireView}
            checked={isEntireView}
            className={RoungeStyle.RoungeCheckBox}
          />

          <label htmlFor="publicStudy">공개스터디만</label>
          <input
            type="checkbox"
            id="publicStudy"
            onChange={togglePublicStudy}
            checked={isPublicStudy}
            className={RoungeStyle.RoungeCheckBox}
          />
        </fieldset> */}
      </div>
    </div>
  );
};

export default StudyRounge;
