import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeList = (props) => {
  const filterSkill = useSelector((state) => state.selectStudy.skillList);
  const filterUser = useSelector((state) => state.selectStudy.studySelect);
  const token = useSelector((state) => state.token.accesstoken);
  const [data, setData] = useState([]);
  let search = props.checkFilter;

  useEffect(() => {
    //처음에 얘가 동작이 되면 안돼..
    try {
      const response = axios
        .get(`/api/v1/studies`, {
          params: { skill: filterSkill, user: filterUser },
          headers: { "X-AUTH-TOKEN": token },
        })
        .then(function (response) {
          setData(response.data.content);
        });
      //필터링 된 목록들을 가져오는 api입니다.
      setData(response.data); //데이터를 우선 전부 가져옵니다.
    } catch (err) {
      console.log(err);
    }
  }, [search]); //상위에서 반응이 온다면?

  const dummystudy = [
    {
      title: "첫번째 스터디",
      skill: ["python", "java"],
      description: "파이썬을 함께할 팀원을 모집합니다!",
      region: "대전",
    },
    {
      title: "두번째 스터디",
      skill: ["python", "java"],
      description: "자바스터디 함께할 팀원을 모집합니다!",
      region: "서울",
    },
    {
      title: "세번째 스터디",
      skill: ["python", "vue"],
      description: "프론트엔드 함께할 팀원을 모집합니다!",
      region: "구미",
    },
  ];
  console.log(props);
  console.log(data);
  return (
    <div className={RoungeStyle.RoungeListContainer}>
      <h3>리스트</h3>
      <div className={RoungeStyle.Listcontainer}>
        {data?.map(
          (study, key) => (
            localStorage.setItem("studyId", study.id),
            (
              <div key={key} className={RoungeStyle.StudyListcard}>
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
            )
          )
        )}
      </div>
    </div>
  );
};

export default RoungeList;
