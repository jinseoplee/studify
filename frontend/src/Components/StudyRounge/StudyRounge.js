import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectstudyActions } from "../../store/StudyRounge";
import { selectdayActions } from "../../store/StudyStore";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import RoungeList from "./RoungeList";
import { useRef } from "react";

const StudyRounge = () => {
  const dispatch = useDispatch();
  const [checkSkill, setCheckSkill] = useState([]);
  const [checkViewStudy, setCheckViewStudy] = useState("");
  const [checkFilter, setCheckFilter] = useState(false);
  const [selectedId, setSeletedId] = useState(0);
  const [region, setRegion] = useState(false);
  const [regionName, setRegionName] = useState(null);
  const [classnum, setClassnum] = useState(false);
  const [classnumName, setClassnumName] = useState(null);
  const [isPublic, setIsPublic] = useState(null);
  const [tokencookies, setTokenCookie, removeTokenCookie] = useCookies([
    "userToken",
  ]);
  const [studyIdcookies, setStudyIdcookies, removeStudyIdcookes] = useCookies([
    "studyId",
  ]);
  const navigate = useNavigate();
  const mounted = useRef(false);

  const userToken = useSelector((state) => state.token.accesstoken);
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

  const handleRegion = () => {
    if (region) {
      setRegion(false);
      setRegionName(null);
    } else {
      setRegion(true);
      //유저의 지역이름 저장.

      setRegionName("대전");
    }
  };

  const handleClassnum = () => {
    if (classnum) {
      setClassnum(false);
      setClassnumName(null);
    } else {
      setClassnum(true);
      //유저의 반을 저장.
      setClassnumName(5);
    }
  };

  const handleIsPublic = () => {
    if (isPublic === null) {
      console.log("ㅋㅋㅋㅋ 이거맞니?");
      setIsPublic(true);
    }
    if (isPublic) {
      setIsPublic(false);
    } else {
      setIsPublic(true);
    }
  };

  // const handleSingleCheck = (checked, id) => {
  //   console.log("나 동작해?");
  //   console.log(checked);
  //   console.log(checkViewStudy);
  //   if (checked) {
  //     setCheckViewStudy((prev) => prev + id + ",");
  //   } else {
  //     setCheckViewStudy((prev) => {
  //       if (prev === undefined) {
  //         setCheckViewStudy("");
  //       } else {
  //         const str = id + ",";
  //         setCheckViewStudy(checkViewStudy.replace(str, ""));
  //       }
  //     });
  //   }
  // };

  const filterStudy = () => {
    console.log("검색 클릭합니다.");
    console.log(checkViewStudy);
    if (checkViewStudy.charAt(checkViewStudy.length - 1) === ",") {
      setCheckViewStudy(checkViewStudy.slice(0, -1));
    }
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
    removeTokenCookie("userToken");
    removeStudyIdcookes("studyId");
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
    console.log(selectedId);
    console.log("나 동작해야해?");
    setTokenCookie("userToken", userToken);
    setStudyIdcookies("studyId", selectedId);

    navigate(`/study/${selectedId}`);
  };

  return (
    <>
      <div className={RoungeStyle.Container}>
        <span className={RoungeStyle.leftContanier}>
          <div className={RoungeStyle.RoungeSkillContainer}>
            {data.map((data, key) => (
              <div key={key} className={RoungeStyle.RoungeFilterBtn}>
                <button
                  name={`select-${data.skill}`}
                  onClick={() => {
                    !checkSkill.includes(data.skill)
                      ? setCheckSkill((checkSkill) => [
                          ...checkSkill,
                          data.skill,
                        ])
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
          <div className={RoungeStyle.RoungeInfoContainer}>
            <fieldset>
              <div key="region" className={RoungeStyle.RoungeInfoBox}>
                <label htmlFor="region">같은지역 보기</label>
                <input
                  type="checkbox"
                  name="region"
                  onChange={handleRegion}
                  checked={region}
                  id="region"
                ></input>
              </div>
              <div key="classnum" className={RoungeStyle.RoungeInfoBox}>
                <label htmlFor="classnum">같은반 보기</label>
                <input
                  type="checkbox"
                  name="classnum"
                  onChange={handleClassnum}
                  checked={classnum}
                  id="classnum"
                ></input>
              </div>
              <div key="ispublic" className={RoungeStyle.RoungeInfoBox}>
                <label htmlFor="ispublic">공유 스터디</label>
                <input
                  type="checkbox"
                  name="ispublic"
                  onChange={handleIsPublic}
                  checked={isPublic}
                  id="ispublic"
                ></input>
              </div>
            </fieldset>
          </div>
        </span>
        <div className={RoungeStyle.rightContainer}>
          <button onClick={filterStudy} className={RoungeStyle.RoungeSearchBtn}>
            검색
          </button>
        </div>
      </div>
      <RoungeList
        checkFilter={checkFilter}
        idselect={idselect}
        region={regionName}
        classnum={classnumName}
        isPublic={isPublic}
      />
    </>
  );
};

export default StudyRounge;
