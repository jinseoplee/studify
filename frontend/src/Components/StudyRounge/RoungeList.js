import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeList = (props) => {
  const filterSkill = useSelector((state) => state.selectStudy.skillList);
  const filterUser = useSelector((state) => state.selectStudy.studySelect);
  const token = useSelector((state) => state.token.accesstoken);
  console.log(token);
  console.log(filterSkill);
  console.log(filterUser);
  const [data, setData] = useState([]);
  let search = props.checkFilter;

  // useEffect(() => { //모든 유저를 받아와야하는 axios 요청입니다.
  //   try {
  //     const response = axios.get(`/api/v1/studies`); //스터디 목록을 조회하는 api입니다.
  //     console.log(response);
  //     setData(response); //데이터를 우선 전부 가져옵니다.(내일 데이터 어떻게 가져오는지 확인해보자).
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },[]) //처음 렌더링 될때 우선 모든 데이터를 다 가져옵니다.

  useEffect(() => {
    console.log("나 실행돼냐?");
    //처음에 얘가 동작이 되면 안돼..
    try {
      const response = axios
        .get(`/api/v1/studies`, {
          params: { skill: filterSkill, user: filterUser },
          headers: { "X-AUTH-TOKEN": token },
        })
        .then(function (response) {
          console.log(response.data.content);
          setData(response.data.content);
        });
      //필터링 된 목록들을 가져오는 api입니다.
      // console.log(response);
      setData(response.data); //데이터를 우선 전부 가져옵니다.(내일 데이터 어떻게 가져오는지 확인해보자).
    } catch (err) {
      console.log(err);
    }
  }, [search]); //상위에서 반응이 온다면?
  //어짜피 search가 있어도 처음 마운트 될때 이 useEffect도 실행이 된다면..
  //굳이 api가 2개나 있을 필요가 있을까?
  //처음 렌더링 됐을때 만약 skill과 user의 길이가 둘다 0이라면 response로 모든 스터디 목록을 보내주고
  //만약 둘중 하나라도 길이가 1이라면 해당 되는 것에 필터링 된것을 보내줘도 되지않을까? 라는생각입니다.
  console.log(data);
  const dummystudy = [
    {
      title: "첫번째 스터디",
      skill: "python",
      description: "파이썬을 함께할 팀원을 모집합니다!",
      region: "대전",
      year: 8,
      class: 1,
    },
    {
      title: "두번째 스터디",
      skill: "java",
      description: "자바스터디 함께할 팀원을 모집합니다!",
      region: "서울",
      year: 8,
      class: 5,
    },
    {
      title: "세번째 스터디",
      skill: "vue",
      description: "프론트엔드 함께할 팀원을 모집합니다!",
      region: "구미",
      year: 9,
      class: 3,
    },
  ];

  return (
    <div className={RoungeStyle.RoungeListContainer}>
      <h3>리스트</h3>
      <div className={RoungeStyle.Listcontainer}>
        {dummystudy.map((data, key) => (
          <div key={key} className={RoungeStyle.StudyListcard}>
            <div className={RoungeStyle.StudyListcardheader}>
              <img
                src="https://images6.alphacoders.com/312/thumb-1920-312773.jpg"
                alt="rover"
              />
            </div>
            <div className={RoungeStyle.StudyListCardbody}>
              <span className={RoungeStyle.Studytag}>{data.skill}</span>
              <h4>{data.title}</h4>
              <span>기수 : {data.year}기 </span>
              <span>지역 : {data.region}</span>
              <span>반 : {data.class}반 </span>
              <span>{data.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoungeList;
