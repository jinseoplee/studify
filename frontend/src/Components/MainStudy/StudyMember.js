import { useOutletContext } from "react-router-dom";
import memberpic from "../../assets/image/memberpic.png";
import Style from "../../Style/MainStudy/StudyOutlet.module.css";

const StudyMember = () => {
  const { studydata } = useOutletContext();

  return (
    <div className={Style.StudyMembercontainer}>
      <div className={Style.StudyMemberBox}>
        <div className={Style.Maintainerbox}>
          <img alt="member" src={memberpic} className={Style.userImg}></img>
          <div>
            <h5 style={{ fontSize: "25px" }}>스터디장</h5>
            <div className={Style.userTitle}>
              <p>
                {studydata.users && studydata.users[0].region}{" "}
                {studydata.users && studydata.users[0].classNum}반
              </p>
              <p style={{ marginLeft: "7px" }}>
                {" "}
                {studydata.users && studydata.users[0].name}
              </p>
            </div>
          </div>
          <div className={Style.MemberTime}>
            <p style={{ marginRight: "10px" }}>공부 총 시간</p>
            <span>
              {parseInt(studydata.users[0].totalTime / 3600)}시간{" "}
              {parseInt((studydata.users[0].totalTime % 3600) / 60)}분{" "}
              {parseInt(studydata.users[0].totalTime % 60)}초
            </span>
          </div>
        </div>
        <div>
          {studydata.users &&
            studydata.users.slice(1).map((study) => (
              <div key={study.id}>
                <div className={Style.Maintainerbox}>
                  <img
                    alt="member"
                    src={memberpic}
                    className={Style.userImg}
                  ></img>
                  <div>
                    <h5 style={{ fontSize: "25px" }}>스터디원</h5>
                    <div className={Style.userTitle}>
                      <p>
                        {study.region} {study.classNum}반
                      </p>
                      <p style={{ marginLeft: "7px" }}>{study.name}</p>
                    </div>
                  </div>
                  <div className={Style.MemberTime}>
                    <p style={{ marginRight: "10px" }}>공부 총 시간</p>
                    <span>
                      {parseInt(study.totalTime / 3600)}시간{" "}
                      {parseInt((study.totalTime % 3600) / 60)}분{" "}
                      {parseInt(study.totalTime % 60)}초
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMember;
