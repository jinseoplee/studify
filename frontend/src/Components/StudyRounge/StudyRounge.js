import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectstudyActions } from "../../store/StudyRounge";
import { selectdayActions } from "../../store/StudyStore";

import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import RoungeList from "./RoungeList";
import { useRef } from "react";

const StudyRounge = () => {
  const dispatch = useDispatch();
  const [checkSkill, setCheckSkill] = useState([]);
  const [checkViewStudy, setCheckViewStudy] = useState([]);
  const [checkFilter, setCheckFilter] = useState(false);
  const [selectedId, setSeletedId] = useState(0);
  const navigate = useNavigate();
  const mounted = useRef(false);

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

  //그럼 여기서 나의 정보를 가지고 있어야합니다.
  const studyViewData = [
    {
      id: 100, //우리반 스터디인지 확인하는 아이디(100번)
      name: "우리반 보기",
      checkStudy: 1,
    },
    {
      id: 101, //공개스터디만
      name: "공개스터디 보기",
      checkStudy: "공개",
    },
    {
      id: 102, //기수만
      name: "같은기수 보기",
      checkStudy: 8,
    },
    {
      id: 103, //우리지역만
      name: "같은지역 보기",
      checkStudy: "대전",
    },
  ];

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckViewStudy((prev) => [...prev, id]);
    } else {
      setCheckViewStudy(checkViewStudy.filter((el) => el !== id));
    }
  };

  const filterStudy = () => {
    if (checkFilter === false) {
      setCheckFilter(true);
    } else {
      setCheckFilter(false);
    }
  };

  //해당 배열이 존재하는 경우에는? className을 새로줘서 button의 border에 색을 주어서 처리하면 내가 눌렀다는 걸 알지 않을까?
  useEffect(() => {
    dispatch(selectstudyActions.changestudySelect(checkViewStudy));
    dispatch(selectstudyActions.changeskillList(checkSkill));
  }, [checkViewStudy, checkSkill]);

  const idselect = (id) => {
    setSeletedId(id);
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      dispatch(selectdayActions.changestudynum(selectedId));
      goDetailPage();
    }
  }, [selectedId]);

  const goDetailPage = () => {
    //여기서 해당 스터디에 해당하는 id 부분으로 가야합니다. 즉
    // navigate(`/study/${id}`);
    console.log(selectedId);
    navigate(`/study/${selectedId}`);
  };

  return (
    <div>
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
              <label htmlFor={data.name}>{data.name}</label>
              <input
                type="checkbox"
                name={`select-${data.id}`}
                onChange={(e) =>
                  handleSingleCheck(e.target.checked, data.checkStudy)
                }
                checked={
                  checkViewStudy.includes(data.checkStudy) ? true : false
                }
                // id="chk_top"
                id={data.checkStudy}
              ></input>
            </div>
          ))}
        </div>
        <button onClick={filterStudy}>검색</button>
      </div>
      <RoungeList checkFilter={checkFilter} idselect={idselect} />
    </div>
  );
};

export default StudyRounge;
