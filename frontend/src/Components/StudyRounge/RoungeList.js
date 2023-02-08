import { useSelector } from "react-redux";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeList = () => {
  const filterSkill = useSelector((state) => state.selectStudy.skillList);
  const filterUser = useSelector((state) => state.selectStudy.studySelect);
  console.log(filterSkill.length);
  console.log(filterUser.length);
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
  const check = () => {
    const file = localStorage.getItem("upload");
    console.log(file);
    console.log(typeof file);
    console.log("나 클릭돼?");
  };

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
