import RoungeStyle from "./StudyRounge.module.css";

const StudyRounge = () => {
  return (
    <div className={RoungeStyle.RoungeFilterContainer}>
      <h3>필터 버튼 자리</h3>
      <div>
        <button className={RoungeStyle.RoungeFilterBtn}>파이썬</button>
        <button className={RoungeStyle.RoungeFilterBtn}>자바</button>
        <button className={RoungeStyle.RoungeFilterBtn}>자바스크립트</button>
        <button className={RoungeStyle.RoungeFilterBtn}>C++</button>
        <button className={RoungeStyle.RoungeFilterBtn}>Vue</button>
        <button className={RoungeStyle.RoungeFilterBtn}>React</button>
      </div>
    </div>
  );
};

export default StudyRounge;
