import { Outlet } from "react-router-dom";
import RankSwitchbar from "./RankSwitchbar";
import RankStyle from "../../Style/Rank/Rank.module.css"

const RankDetail = () => {
  return (
    <div className={RankStyle.wrapper}>
      <div className={RankStyle.RankMainContainer}>
        <div className={RankStyle.RankSwitchBarContainer}>
          <RankSwitchbar />
        </div>
      <Outlet />
      </div>
    </div>
  );
};

export default RankDetail;
