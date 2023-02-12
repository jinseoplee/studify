import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeList = (props) => {
  const filterSkill = useSelector((state) => state.selectStudy.skillList);
  const filterUser = useSelector((state) => state.selectStudy.studySelect);
  const token = useSelector((state) => state.token.accesstoken);
  const [data, setData] = useState([]);
  const [viewList, setViewList] = useState(2); //처음에 2개만 보여준다고 우선 가정.
  const [moreButton, setMoreButton] = useState(true); //더보기 버튼 보여줄 것인지 안보여줄 것인지 확인.
  let search = props.checkFilter;
  console.log(filterUser);

  console.log(filterUser);
  useEffect(() => {
    const skill = filterSkill.join(",");

    try {
      const response = axios
        .get(`/api/v1/studies`, {
          headers: { "X-AUTH-TOKEN": token },
          params: {
            category: skill,
            info: filterUser,
            //기수 지역 반
          },
        })
        .then(function (response) {
          setData(response.data.content);
        });
      setData(response.data); //데이터를 우선 전부 가져옵니다.
    } catch (err) {
      console.log(err);
    }
  }, [search]); //상위에서 반응이 온다면?

  const dummystudy = [
    {
      title: "첫번째 스터디",
      category: ["python", "java"],
      description: "파이썬을 함께할 팀원을 모집합니다!",
      region: "대전",
      class: "1",
    },
    {
      title: "두번째 스터디",
      category: ["python", "java"],
      description: "자바스터디 함께할 팀원을 모집합니다!",
      region: "서울",
      class: "5",
    },
    {
      title: "세번째 스터디",
      category: ["python", "vue"],
      description: "프론트엔드 함께할 팀원을 모집합니다!",
      region: "구미",
      class: "3",
    },
  ];

  const moreStudyList = () => {
    setViewList(viewList + 2);
    console.log(dummystudy.length);
  };

  useEffect(() => {
    if (viewList >= dummystudy.length) {
      setMoreButton(false);
    }
  }, [viewList]);

  return (
    <div className={RoungeStyle.RoungeListContainer}>
      <h3>리스트</h3>
      <div className={RoungeStyle.Listcontainer}>
        {dummystudy
          ?.map((study, key) => (
            <div
              key={key}
              className={RoungeStyle.StudyListcard}
              onClick={() => props.idselect(study.id)}
            >
              <div className={RoungeStyle.StudyListcardheader}>
                <img
                  src="https://images6.alphacoders.com/312/thumb-1920-312773.jpg"
                  alt="rover"
                />
              </div>
              <div className={RoungeStyle.StudyListCardbody}>
                <span className={RoungeStyle.Studytag}>{study.skill}</span>
                <h4>{study.title}</h4>
                {study.category.map((skill, num) => (
                  <div key={num}>
                    <span>{skill}</span>
                  </div>
                ))}
                <span>{study.region}</span>
                <span>{study.class}</span>
                <span>{study.description}</span>
              </div>
            </div>
          ))
          .slice(0, viewList)}
      </div>
      {moreButton && (
        <button className={RoungeStyle.moreButton} onClick={moreStudyList}>
          더보기
        </button>
      )}
    </div>
  );
};

export default RoungeList;
