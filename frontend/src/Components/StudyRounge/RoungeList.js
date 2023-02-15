import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectstudyActions } from "../../store/StudyRounge";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";

const RoungeList = (props) => {
  const filterSkill = useSelector((state) => state.selectStudy.skillList);
  const userToken = useSelector((state) => state.token.accesstoken);
  const [firstcheck, setFirstCheck] = useState(true);
  const [data, setData] = useState([]);
  const [viewList, setViewList] = useState(4);
  const [moreButton, setMoreButton] = useState(true); //더보기 버튼 보여줄 것인지 안보여줄 것인지 확인.
  let search = props.checkFilter;
  const dispatch = useDispatch();

  useEffect(() => {
    let skill = filterSkill.join(",");
    if (skill.length === 0) {
      skill = null;
    } else {
    }
    let isPublic = props.isPublic;
    if (isPublic === false) {
      isPublic = null;
    }
    setViewList(4);
    console.log(skill);
    try {
      const response = axios
        .get(`/api/v1/studies`, {
          headers: { "X-AUTH-TOKEN": userToken },
          params: {
            category: skill,
            region: props.region,
            classnum: props.classnum,
            ispublic: isPublic,
            //기수 지역 반
          },
        })
        .then(function (response) {
          setData(response.data.content);
          dispatch(selectstudyActions.changestudySelect());
          dispatch(selectstudyActions.changeskillList([]));
        });
      console.log(response);
      setData(response.data); //데이터를 우선 전부 가져옵니다.;
    } catch (err) {
      console.log(err);
    }
  }, [search]); //상위에서 반응이 온다면?

  const moreStudyList = () => {
    setViewList(viewList + 4);
  };

  useEffect(() => {
    if (firstcheck) {
      setFirstCheck(false);
      return;
    }
    if (viewList >= data?.length) {
      setMoreButton(false);
    } else {
      setMoreButton(true);
    }
  }, [viewList]);

  return (
    <div className={RoungeStyle.RoungeListContainer}>
      <div className={RoungeStyle.Listcontainer}>
        {data
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
                <div className={RoungeStyle.Studytitle}>
                  <h2 className={RoungeStyle.StudytitleLeft}>{study.title}</h2>
                  <h4 className={RoungeStyle.StudytitleRight}>
                    최대인원 : {study.capacity}명
                  </h4>
                </div>
                <b className={RoungeStyle.usingSkill}>사용 기술</b>
                <div className={RoungeStyle.StudySkill}>
                  {study.category?.map((skill, num) => (
                    <span key={num} className={RoungeStyle.Studytag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
          .slice(0, viewList)}
      </div>
      {moreButton && (
        <div className={RoungeStyle.buttonContainer}>
          <div className={RoungeStyle.buttonLine}>
            <button className={RoungeStyle.moreButton} onClick={moreStudyList}>
              더보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoungeList;
