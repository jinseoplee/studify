import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeList = () => {
  const dummystudy = [
    {
      title: "첫번째 스터디",
      skill: "Python",
      description: "파이썬을 함께할 팀원을 모집합니다!",
    },
    {
      title: "두번째 스터디",
      skill: "Java",
      description: "자바스터디 함께할 팀원을 모집합니다!",
    },
    {
      title: "세번째 스터디",
      skill: "Vue",
      description: "프론트엔드 함께할 팀원을 모집합니다!",
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
              <p>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className={RoungeStyle.Listcontainer}>
        <div className={RoungeStyle.StudyListcard}>
          <div className={RoungeStyle.StudyListcardheader}>
            <img
              src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
              alt="rover"
            />
          </div>
          <div className={RoungeStyle.StudyListCardbody}>
            <span className={RoungeStyle.Studytag}>Python</span>
            <h4>첫번째 스터디</h4>
            <p>함께 스터디 할 팀원을 모집합니다</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RoungeList;
