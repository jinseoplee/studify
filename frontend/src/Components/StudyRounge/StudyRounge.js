import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectstudyActions } from "../../store/StudyRounge";

import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const StudyRounge = () => {
  const dispatch = useDispatch();
  const data = [
    {
      id: 0,
      skill: "python",
      classify: false,
    },
    {
      id: 1,
      skill: "java",
      classify: false,
    },
    {
      id: 2,
      skill: "javascript",
      classify: false,
    },
    {
      id: 3,
      skill: "cpp",
      classify: false,
    },
    {
      id: 4,
      skill: "vue",
      classify: false,
    },
    {
      id: 5,
      skill: "spring",
      classify: false,
    },
    {
      id: 6,
      skill: "react",
      classify: false,
    },
  ];

  const studyViewData = [
    {
      id: 100, //우리반 스터디인지 확인하는 아이디(100번)
      checkStudy: "우리반",
    },
    {
      id: 101, //공개스터디만
      checkStudy: "공개",
    },
    {
      id: 102, //기수만
      checkStudy: "같은기수",
    },
    {
      id: 103, //우리지역만
      checkStudy: "같은자역",
    },
  ];

  const [checkSkill, setCheckSkill] = useState([]);
  const [checkViewStudy, setCheckViewStudy] = useState([]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckViewStudy((prev) => [...prev, id]);
    } else {
      setCheckViewStudy(checkViewStudy.filter((el) => el !== id));
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
  dispatch(selectstudyActions.changeskillList(checkSkill));
  return (
    <div>
      <div className={RoungeStyle.RoungeFilterContainer}>
        {data.map((data, key) => (
          <div key={key}>
            <button
              name={`select-${data.skill}`}
              onClick={() => {
                !checkSkill.includes(data.skill)
                  ? setCheckSkill((checkSkill) => [...checkSkill, data.skill])
                  : setCheckSkill(
                      checkSkill.filter((button) => button !== data.skill)
                    );
              }}
              id={data.skill}
              className={
                checkSkill.includes(data.skill)
                  ? `${RoungeStyle.RoungeFilterTBtn}`
                  : `${RoungeStyle.RoungeFilterFBtn}`
              }
            >
              <img
                src={require(`../../assets/image/stack/${data.skill}.PNG`)}
                id={data.skill}
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
      </div>
    </div>
  );
};

export default StudyRounge;
